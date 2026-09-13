package com.cloudshare.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVerificationDTO {

    @com.fasterxml.jackson.annotation.JsonProperty("razorpay_order_id")
    private String razorpay_order_id;
    @com.fasterxml.jackson.annotation.JsonProperty("razorpay_payment_id")
    private String razorpay_payment_id;
    @com.fasterxml.jackson.annotation.JsonProperty("razorpay_signature")
    private String razorpay_signature;
    private String planId;

}
