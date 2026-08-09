package com.cloudshare.service;

import com.cloudshare.entity.UserCredits;
import com.cloudshare.repository.UserCreditsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserCreditsService {

    private final UserCreditsRepository userCreditsRepository;

    @Transactional
    public UserCredits createInitialCredits(String clerkId) {
        // Avoid duplicate credits for the same user
        if (userCreditsRepository.existsByCreditId(clerkId)) {
            log.info("Credits already exist for clerkId: {}", clerkId);
            return userCreditsRepository.findByCreditId(clerkId).orElse(null);
        }

        UserCredits userCredits = UserCredits.builder()
                .creditId(clerkId)
                .credits(5)
                .plan("BASIC")
                .build();
        return userCreditsRepository.save(userCredits);
    }

    @Transactional
    public void deleteCredits(String clerkId) {
        userCreditsRepository.findByCreditId(clerkId)
                .ifPresent(userCreditsRepository::delete);
        log.info("Deleted credits for clerkId: {}", clerkId);
    }
}