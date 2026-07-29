package com.cloudshare.controller;

import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<?> registerProfile(@Valid @RequestBody ProfileDTO profileDTO) {
        boolean exists = profileService.existsByClerkId(profileDTO.getClerkId());

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