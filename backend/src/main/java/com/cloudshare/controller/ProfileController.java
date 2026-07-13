package com.cloudshare.controller;

import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProfileController {
      private final ProfileService profileService;
      @PostMapping("/register")
      public ResponseEntity<?> registerProfile(@RequestBody ProfileDTO profileDTO) {
         ProfileDTO savedProfile =  profileService.createProfile(profileDTO);
         return ResponseEntity.status(HttpStatus.CREATED).body(savedProfile);
      }
}
