package com.cloudshare.controller;

import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<?> registerProfile(
            @Valid @RequestBody ProfileDTO profileDTO,
            Authentication authentication) {

        // Always use the clerkId from the verified JWT — never trust the request body
        String clerkId = (String) authentication.getPrincipal();
        profileDTO.setClerkId(clerkId);

        boolean exists = profileService.existsByClerkId(clerkId);

        ProfileDTO savedProfile;
        HttpStatus status;

        if (exists) {
            savedProfile = profileService.updateProfile(profileDTO);
            status = HttpStatus.OK;
        } else {
            savedProfile = profileService.createProfile(profileDTO);
            status = HttpStatus.CREATED;
        }

        return ResponseEntity.status(status).body(savedProfile);
    }
}