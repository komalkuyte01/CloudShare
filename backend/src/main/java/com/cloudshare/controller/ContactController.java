package com.cloudshare.controller;

import com.cloudshare.dto.ContactMessageDTO;
import com.cloudshare.entity.ContactMessage;
import com.cloudshare.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContactMessage(@Valid @RequestBody ContactMessageDTO dto) {
        log.info("Received new contact form submission");

        ContactMessage entity = ContactMessage.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .build();

        contactMessageRepository.save(entity);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Contact message received and saved successfully.");
        return ResponseEntity.ok(response);
    }
}
