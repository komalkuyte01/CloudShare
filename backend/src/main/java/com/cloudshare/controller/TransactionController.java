package com.cloudshare.controller;

import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.dto.TransactionResponseDTO;
import com.cloudshare.entity.PaymentTransaction;
import com.cloudshare.repository.PaymentTransactionRepository;
import com.cloudshare.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final PaymentTransactionRepository paymentTransactionRepository;
    private final ProfileService profileService;

    public TransactionController(
            PaymentTransactionRepository paymentTransactionRepository,
            ProfileService profileService) {
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getTransactions() {

        ProfileDTO currentProfile = profileService.getCurrentProfile();

        String clerkId = currentProfile.getClerkId();

        List<TransactionResponseDTO> transactions =
                paymentTransactionRepository
                        .findByClerkIdOrderByTransactionDateDesc(clerkId)
                        .stream()
                        .map(TransactionResponseDTO::from)
                        .toList();

        return ResponseEntity.ok(transactions);
    }
}