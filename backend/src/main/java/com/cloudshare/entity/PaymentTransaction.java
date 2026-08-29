package com.cloudshare.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Entity(collection = "payment_trasaction")
public class PaymentTransaction {
       private String id;
       private String clerkId;
       private String orderId;
       private String paymentId;
       private String planId;
       private int amount;
       private String currency;
       private int creditsAdded;
       private String status;
       private LocalDateTime transactionDate;
       private String userEmail;
       private String userName;

}
