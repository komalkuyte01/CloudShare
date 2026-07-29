package com.cloudshare.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@Data
@AllArgsConstructor
@Builder
public class UserCreditsService {

    private final UserCreditRepository userCreditRepository;

    public UserCredits createInitialCredits(String clerkId) {

        UserCredits userCredits = UserCredits.builder()
                .clerkId(clerkId)
                .credits(5)
                .plan("BASIC")
                .build();

        return userCreditRepository.save(userCredits);
    }
}