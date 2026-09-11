package com.cloudshare.service;

import com.cloudshare.dto.PaymentDTO;
import com.cloudshare.dto.PaymentVerificationDTO;
import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.entity.PaymentTransaction;
import com.cloudshare.entity.Profile;
import com.cloudshare.repository.PaymentTransactionRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    private final ProfileService profileService;
    private final UserCreditsService userCreditsService;
    private final PaymentTransactionRepository paymentTransactionRepository;

    public PaymentService(
            ProfileService profileService,
            UserCreditsService userCreditsService,
            PaymentTransactionRepository paymentTransactionRepository) {

        this.profileService = profileService;
        this.userCreditsService = userCreditsService;
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    public PaymentDTO createOrder(PaymentDTO paymentDTO) {
        try {
            ProfileDTO currentProfile = profileService.getCurrentProfile();
            String clerkId = currentProfile.getClerkId();
            
            int serverAmount = 0;
            int serverCredits = 0;
            String currency = "INR";
            String planId = paymentDTO.getPlanId() != null ? paymentDTO.getPlanId() : "basic";
            
            switch (planId.toLowerCase()) {
                case "premium":
                    serverAmount = 50000; // 500 INR in paise
                    serverCredits = 500;
                    break;
                case "ultimate":
                    serverAmount = 500000; // 5000 INR in paise
                    serverCredits = 5000;
                    break;
                default:
                    throw new RuntimeException("Invalid plan selected for order creation");
            }

            RazorpayClient razorpayClient =
                    new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", serverAmount);
            orderRequest.put("currency", currency);
            orderRequest.put("receipt", "order_" + System.currentTimeMillis());

            Order order = razorpayClient.orders.create(orderRequest);
            String orderId = order.get("id");

            // Create pending transaction record
            PaymentTransaction transaction = PaymentTransaction.builder()
                    .clerkId(clerkId)
                    .orderId(orderId)
                    .planId(planId)
                    .amount(serverAmount / 100)
                    .currency(currency)
                    .creditsAdded(serverCredits)
                    .status("PENDING")
                    .transactionDate(LocalDateTime.now())
                    .userEmail(currentProfile.getEmail())
                    .userName(
                            currentProfile.getFirstName() + " "
                                    + currentProfile.getLastName()
                    )
                    .build();

            paymentTransactionRepository.save(transaction);

            return PaymentDTO.builder()
                    .orderId(orderId)
                    .amount(serverAmount)
                    .currency(currency)
                    .credits(serverCredits)
                    .success(true)
                    .message("Order created successfully")
                    .build();

        } catch (Exception e) {
            return PaymentDTO.builder()
                    .success(false)
                    .message("Error creating order: " + e.getMessage())
                    .build();
        }
    }

    public PaymentDTO verifyPayment(PaymentVerificationDTO request) {
        try {
            ProfileDTO currentProfile = profileService.getCurrentProfile();
            String clerkId = currentProfile.getClerkId();

            String data = request.getRazorpay_order_id() + "|" + request.getRazorpay_payment_id();
            String signature = generateHmacSHA256Signature(data, razorpayKeySecret);

            if (!signature.equals(request.getRazorpay_signature())) {
                updateTransactionStatus(request.getRazorpay_order_id(), "FAILED", request.getRazorpay_payment_id(), null, clerkId);
                return PaymentDTO.builder()
                        .success(false)
                        .message("Payment verification failed: Invalid signature")
                        .build();
            }

            int creditsToAdd = 0;
            String plan = "Basic";

            switch (request.getPlanId().toLowerCase()) {
                case "premium":
                    creditsToAdd = 500;
                    plan = "PREMIUM";
                    break;
                case "ultimate":
                    creditsToAdd = 5000;
                    plan = "ULTIMATE";
                    break;
            }

            if (creditsToAdd > 0) {
                // updateTransactionStatus is transactional. It ensures the status was PENDING before we grant credits.
                updateTransactionStatus(request.getRazorpay_order_id(), "SUCCESS", request.getRazorpay_payment_id(), creditsToAdd, clerkId);
                // If it passes without Exception, we can safely grant credits
                userCreditsService.addCredits(clerkId, creditsToAdd, plan);
                
                return PaymentDTO.builder()
                        .success(true)
                        .message("Payment verified and credits added successfully")
                        .credits(userCreditsService.getUserCredits(clerkId).getCredits())
                        .build();
            } else {
                updateTransactionStatus(request.getRazorpay_order_id(), "FAILED", request.getRazorpay_payment_id(), null, clerkId);
                return PaymentDTO.builder()
                        .success(false)
                        .message("Payment verification failed: Invalid plan selected")
                        .build();
            }
        } catch (Exception e) {
            try {
                // Do not pass clerkId here since it might be a general failure
                updateTransactionStatus(request.getRazorpay_order_id(), "ERROR", request.getRazorpay_payment_id(), null, null);
            } catch (Exception ex) {
                // Ignore or log error updating transaction status
            }
            return PaymentDTO.builder()
                    .success(false)
                    .message("Error verifying payment: " + e.getMessage())
                    .build();
        }
    }

    @org.springframework.transaction.annotation.Transactional
    protected void updateTransactionStatus(String razorpay_order_Id, String status, String razorPaymentId, Integer creditsToAdd, String clerkId) {
        PaymentTransaction transaction = paymentTransactionRepository.findByOrderId(razorpay_order_Id)
                .orElseThrow(() -> new RuntimeException("Transaction not found for orderId: " + razorpay_order_Id));
                
        // Ensure atomic redemption (owner match and pending status)
        if (creditsToAdd != null && status.equals("SUCCESS")) {
            if (!transaction.getClerkId().equals(clerkId)) {
                throw new RuntimeException("Transaction owner mismatch");
            }
            if (!"PENDING".equals(transaction.getStatus())) {
                throw new RuntimeException("Transaction is no longer pending");
            }
        }
        
        transaction.setStatus(status);
        transaction.setPaymentId(razorPaymentId);
        if (creditsToAdd != null) {
            transaction.setCreditsAdded(creditsToAdd);
        }
        paymentTransactionRepository.save(transaction);
    }

    private String generateHmacSHA256Signature(String data, String secret) {
        try {
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            javax.crypto.spec.SecretKeySpec secretKeySpec = new javax.crypto.spec.SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hashBytes = mac.doFinal(data.getBytes("UTF-8"));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error generating HMAC SHA256 signature: " + e.getMessage(), e);
        }
    }
}