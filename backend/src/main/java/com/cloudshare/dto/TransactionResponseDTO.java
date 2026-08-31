package com.cloudshare.dto;

import com.cloudshare.entity.PaymentTransaction;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TransactionResponseDTO {
    private Long id;
    private LocalDateTime transactionDate;
    private String planId;
    private Integer amount;
    private Integer creditsAdded;
    private String status;
    private String paymentId;

    public static TransactionResponseDTO from(PaymentTransaction transaction) {
        return TransactionResponseDTO.builder()
                .id(transaction.getId())
                .transactionDate(transaction.getTransactionDate())
                .planId(transaction.getPlanId())
                .amount(transaction.getAmount())
                .creditsAdded(transaction.getCreditsAdded())
                .status(transaction.getStatus())
                .paymentId(transaction.getPaymentId())
                .build();
    }
}
