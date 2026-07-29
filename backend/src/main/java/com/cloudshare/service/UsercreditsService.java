package com.cloudshare.service;

import com.cloudshare.entity.Profile;
import com.cloudshare.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCreditsService {

    private final ProfileRepository profileRepository;

    /**
     * Adds initial credits (5) to the profile identified by clerkId.
     * This is now backed by the credits field on the Profile entity
     * instead of a separate UserCredits entity that doesn't exist.
     */
    public void addInitialCredits(Profile profile, int credits) {
        profile.setCredits(credits);
        profileRepository.save(profile);
    }
}