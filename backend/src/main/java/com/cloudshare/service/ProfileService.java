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

        // Find existing user by Clerk ID
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

    public ProfileDTO updateProfile(ProfileDTO profileDTO){
        ProfileDocument exisitingProfile = profileRepository.findByClerkId(profileDTO.getClerkId());
        if(existingProfile != null) {
            if (profileDTO.getEmail() != null && !profileDTO.getEmail().isEmpty()) {
                existingProfile.setEmail(profileDTO.getEmail());
            }
            if (profileDTO.getFirstName() != null && !profileDTO.getFirstName().isEmpty()) {
                existingProfile.setFirstName(profileDTO.getFirstName());
            }
            if (profileDTO.getLastName() != null && !profileDTO.getLastName().isEmpty()) {
                existingProfile.setLastName(profileDTO.getLastName());
            }
            if (profileDTO.getPhotoUrl() != null && !profileDTO.getPhotoUrl().isEmpty()) {
                existingProfile.setPhotoUrl(profileDTO.getPhotoUrl());
            }
            profileRepository.save(exisitingProfile);
        }
    }
}