package com.cloudshare.service;

import com.cloudshare.document.ProfileDocument;
import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    public ProfileDTO createProfile(ProfileDTO profileDTO) {
      ProfileDocument profile = ProfileDocument.builder()
              .clerkId(profileDTO.getClerkId())
              .firstName(profileDTO.getFirstName())
              .lastName(profileDTO.getLastName())
              .email(profileDTO.getEmail())
              .photoUrl(profileDTO.getPhotoUrl())
              .credits(5)
              .createdAt(Instant.now())
              .build();
      profile = profileRepository.save(profile);

      return  ProfileDTO.builder()
              .id(profile.getId())
              .clerkId(profile.getClerkId())
              .firstName(profile.getFirstName())
              .lastName(profile.getLastName())
              .email(profile.getEmail())
              .photoUrl(profile.getPhotoUrl())
              .credits(profile.getCredits())
              .createdAt(profile.getCreatedAt())
              .build();
    }
}
