package com.cloudshare.controller;

import com.cloudshare.dto.ProfileDTO;
import com.cloudshare.service.ProfileService;
import com.cloudshare.service.UserCreditsService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/webhooks")
@RequiredArgsConstructor
@Slf4j
public class ClerkWebhookController {

    private final ProfileService profileService;
    private final ObjectMapper objectMapper;
    private final UserCreditsService userCreditsService;

    @Value("${clerk.webhook-secret}")
    private String webhookSecret;

    @PostMapping("/clerk")
    public ResponseEntity<Map<String, String>> handleClerkWebhook(
            @RequestBody String payload,
            @RequestHeader(value = "svix-id", required = false) String svixId,
            @RequestHeader(value = "svix-timestamp", required = false) String svixTimestamp,
            @RequestHeader(value = "svix-signature", required = false) String svixSignature) {

        //System.out.println("======================================");
        //System.out.println("WEBHOOK RECEIVED");
        //System.out.println("======================================");

        // TEMPORARY: Skip signature verification
        // if (!verifyWebhookSignature(payload, svixId, svixTimestamp, svixSignature)) {
        //     log.warn("Webhook signature verification failed");
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        //             .body(Map.of("error", "Invalid webhook signature"));
        // }

        try {
            JsonNode rootNode = objectMapper.readTree(payload);

            String eventType = rootNode.path("type").asText();
            JsonNode data = rootNode.path("data");

            log.info("Received Clerk webhook event: {}", eventType);

            switch (eventType) {
                case "user.created" -> handleUserCreated(data);
                case "user.updated" -> handleUserUpdated(data);
                case "user.deleted" -> handleUserDeleted(data);
                default -> log.info("Unhandled webhook event type: {}", eventType);
            }

            return ResponseEntity.ok(Map.of("status", "success"));

        } catch (Exception e) {
            log.error("Error processing webhook", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Webhook processing failed"));
        }
    }

    private void handleUserCreated(JsonNode data) {
        String clerkId = data.path("id").asText();
        String email = extractPrimaryEmail(data);
        String firstName = data.path("first_name").asText("");
        String lastName = data.path("last_name").asText("");
        String photoUrl = data.path("image_url").asText(null);

        // Skip if profile already exists
        if (profileService.existsByClerkId(clerkId)) {
            log.info("Profile already exists for clerkId: {}", clerkId);
            return;
        }

        ProfileDTO profileDTO = ProfileDTO.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName.isEmpty() ? "User" : firstName)
                .lastName(lastName.isEmpty() ? "" : lastName)
                .photoUrl(photoUrl)
                .build();

        profileService.createProfile(profileDTO);
        userCreditsService.createInitialCredits(clerkId);
        log.info("Created profile for clerkId: {}", clerkId);
    }

    private void handleUserUpdated(JsonNode data) {
        String clerkId = data.path("id").asText();
        String email = extractPrimaryEmail(data);
        String firstName = data.path("first_name").asText(null);
        String lastName = data.path("last_name").asText(null);
        String photoUrl = data.path("image_url").asText(null);

        // If profile doesn't exist yet, create it instead
        if (!profileService.existsByClerkId(clerkId)) {
            log.info("Profile not found for update, creating new profile for clerkId: {}", clerkId);
            handleUserCreated(data);
            return;
        }

        ProfileDTO profileDTO = ProfileDTO.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .photoUrl(photoUrl)
                .build();

        profileService.updateProfile(profileDTO);
        log.info("Updated profile for clerkId: {}", clerkId);
    }

    private void handleUserDeleted(JsonNode data) {
        String clerkId = data.path("id").asText();

        if (!profileService.existsByClerkId(clerkId)) {
            log.info("No profile found to delete for clerkId: {}", clerkId);
            return;
        }

        profileService.deleteProfile(clerkId);
        log.info("Deleted profile for clerkId: {}", clerkId);
    }

    /**
     * Extracts the primary email from Clerk's webhook data.
     * Clerk sends email_addresses as an array; we pick the one matching primary_email_address_id.
     */
    private String extractPrimaryEmail(JsonNode data) {
        String primaryEmailId = data.path("primary_email_address_id").asText("");
        JsonNode emailAddresses = data.path("email_addresses");

        if (emailAddresses.isArray()) {
            for (JsonNode emailNode : emailAddresses) {
                String id = emailNode.path("id").asText();
                if (id.equals(primaryEmailId)) {
                    return emailNode.path("email_address").asText();
                }
            }
            // Fallback: return the first email if primary not matched
            if (!emailAddresses.isEmpty()) {
                return emailAddresses.get(0).path("email_address").asText();
            }
        }

        return "unknown@example.com";
    }

    /**
     * Verifies the Svix webhook signature sent by Clerk.
     * Uses HMAC-SHA256 with the signing secret to validate payload integrity.
     */
    private boolean verifyWebhookSignature(String payload, String svixId,
                                           String svixTimestamp, String svixSignature) {
        if (svixId == null || svixTimestamp == null || svixSignature == null) {
            log.warn("Missing Svix headers");
            return false;
        }

        try {
            // Clerk webhook secrets are prefixed with "whsec_" when using Svix,
            // but yours appears to be a raw Base64 key
            String secret = webhookSecret;
            if (secret.startsWith("whsec_")) {
                secret = secret.substring(6);
            }
            byte[] secretBytes = Base64.getDecoder().decode(secret);

            // Build the signed content: "{svix-id}.{svix-timestamp}.{body}"
            String signedContent = svixId + "." + svixTimestamp + "." + payload;

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretBytes, "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hash = mac.doFinal(signedContent.getBytes(StandardCharsets.UTF_8));

            String computedSignature = "v1," + Base64.getEncoder().encodeToString(hash);

            // Svix may send multiple signatures separated by spaces
            String[] signatures = svixSignature.split(" ");
            for (String sig : signatures) {
                String trimmed = sig.trim();
                if (MessageDigest.isEqual(
                        computedSignature.getBytes(StandardCharsets.UTF_8),
                        trimmed.getBytes(StandardCharsets.UTF_8))) {
                    return true;
                }
            }

            log.warn("No matching signature found");
            return false;

        } catch (Exception e) {
            log.error("Signature verification error: {}", e.getMessage(), e);
            return false;
        }
    }
}
