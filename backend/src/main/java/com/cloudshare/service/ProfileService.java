package com.cloudshare.service;

import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.entity.Profile;
import com.cloudshare.entity.User;
import com.cloudshare.repository.ProfileRepository;
import com.cloudshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileDTO createProfile(ProfileDTO profileDTO) {

        // Find existing user by Clerk ID or create a new one
        User user = userRepository.findByClerkId(profileDTO.getClerkId())
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .clerkId(profileDTO.getClerkId())
                            .email(profileDTO.getEmail())
                            .build();

                    return userRepository.save(newUser);
                });

        Profile profile = Profile.builder()
                .firstName(profileDTO.getFirstName())
                .lastName(profileDTO.getLastName())
                .photoUrl(profileDTO.getPhotoUrl())
                .credits(5)
                .user(user)
                .build();

        profile = profileRepository.save(profile);

        return ProfileDTO.builder()
                .id(profile.getId())
                .clerkId(user.getClerkId())
                .email(user.getEmail())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .photoUrl(profile.getPhotoUrl())
                .credits(profile.getCredits())
                .createdAt(profile.getCreatedAt())
                .build();
    }

    public ProfileDTO updateProfile(ProfileDTO profileDTO) {

        // Find user by Clerk ID
        User user = userRepository.findByClerkId(profileDTO.getClerkId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find profile by user
        Profile existingProfile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Update user email
        if (profileDTO.getEmail() != null && !profileDTO.getEmail().isBlank()) {
            user.setEmail(profileDTO.getEmail());
        }

        // Update profile fields
        if (profileDTO.getFirstName() != null && !profileDTO.getFirstName().isBlank()) {
            existingProfile.setFirstName(profileDTO.getFirstName());
        }

        if (profileDTO.getLastName() != null && !profileDTO.getLastName().isBlank()) {
            existingProfile.setLastName(profileDTO.getLastName());
        }

        if (profileDTO.getPhotoUrl() != null && !profileDTO.getPhotoUrl().isBlank()) {
            existingProfile.setPhotoUrl(profileDTO.getPhotoUrl());
        }

        // Save updates
        userRepository.save(user);
        existingProfile = profileRepository.save(existingProfile);

        return ProfileDTO.builder()
                .id(existingProfile.getId())
                .clerkId(user.getClerkId())
                .email(user.getEmail())
                .firstName(existingProfile.getFirstName())
                .lastName(existingProfile.getLastName())
                .photoUrl(existingProfile.getPhotoUrl())
                .credits(existingProfile.getCredits())
                .createdAt(existingProfile.getCreatedAt())
                .build();
    }
    public boolean existsByClerkId(String clerkId) {

        return profileRepository.existsByUserClerkId(clerkId);
    }
    public void deleteProfile(String clerkId) {
        User user = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profileRepository.delete(profile);
        userRepository.delete(user);

    }
}