package com.cloudshare.repository;

import com.cloudshare.entity.PaymentTransaction;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentTransactionRepository extends CrudRepository<PaymentTransaction, String> {
     List<PaymentTransaction> findByClerkId(String clerkId);

     List<PaymentTransaction>findByClerkIdOrderByTransactionDateDesc(String clerkId);

    List<PaymentTransaction> findByClerkIdAndStatusOrderByTransactionDateDesc(String clerkId, String status, Sort sort);

    Optional<PaymentTransaction> findByOrderId(String orderId);

}
