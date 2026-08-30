package com.cloudshare.service;

import com.cloudshare.dto.PaymentDTO;
import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.entity.PaymentTransaction;
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

            RazorpayClient razorpayClient =
                    new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", paymentDTO.getAmount());
            orderRequest.put("currency", paymentDTO.getCurrency());
            orderRequest.put("receipt", "order_" + System.currentTimeMillis());

            Order order = razorpayClient.orders.create(orderRequest);
            String orderId = order.get("id");

            // Create pending transaction record
            PaymentTransaction transaction = PaymentTransaction.builder()
                    .clerkId(clerkId)
                    .orderId(orderId)
                    .planId(paymentDTO.getPlanId())
                    .amount(paymentDTO.getAmount())
                    .currency(paymentDTO.getCurrency())
                    .creditsAdded(paymentDTO.getCredits())
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
                    .amount(paymentDTO.getAmount())
                    .currency(paymentDTO.getCurrency())
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
}