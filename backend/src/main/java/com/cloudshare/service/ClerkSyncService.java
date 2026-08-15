package com.cloudshare.service;

import com.cloudshare.dto.ProfileDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClerkSyncService {

    private final ProfileService profileService;
    private final UserCreditsService userCreditsService;
    private final ObjectMapper objectMapper;

    @Value("${clerk.secret-key:}")
    private String clerkSecretKey;

    /**
     * Fetches all users from Clerk API and upserts them into the database.
     *
     * @return number of users synced
     */
    public int syncAllUsersFromClerk() throws Exception {

        if (clerkSecretKey == null || clerkSecretKey.isBlank()) {
            throw new IllegalStateException(
                    "CLERK_SECRET_KEY not configured. Add it to application-local.properties."
            );
        }

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "https://api.clerk.com/v1/users?limit=100&order_by=-created_at"
                ))
                .header("Authorization", "Bearer " + clerkSecretKey)
                .header("Content-Type", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        if (response.statusCode() != 200) {
            throw new RuntimeException(
                    "Clerk API error: HTTP "
                            + response.statusCode()
                            + " - "
                            + response.body()
            );
        }

        JsonNode users = objectMapper.readTree(response.body());

        int synced = 0;

        for (JsonNode user : users) {

            try {
                String clerkId = user.path("id").asText(null);

                // Skip invalid Clerk users
                if (clerkId == null || clerkId.isBlank()) {
                    log.warn("Skipping Clerk user with missing ID");
                    continue;
                }

                String email = extractPrimaryEmail(user);

                String firstName =
                        user.path("first_name").asText("");

                String lastName =
                        user.path("last_name").asText("");

                String photoUrl =
                        user.path("image_url").asText(null);

                if (!profileService.existsByClerkId(clerkId)) {

                    ProfileDTO dto = ProfileDTO.builder()
                            .clerkId(clerkId)
                            .email(email)
                            .firstName(
                                    firstName.isBlank()
                                            ? "User"
                                            : firstName
                            )
                            .lastName(lastName)
                            .photoUrl(photoUrl)
                            .build();

                    profileService.createProfile(dto);

                    userCreditsService.createInitialCredits(clerkId);

                    log.info(
                            "Synced new user from Clerk: {} ({})",
                            email,
                            clerkId
                    );

                    synced++;

                } else {

                    log.debug(
                            "User already in DB, skipping: {}",
                            clerkId
                    );
                }

            } catch (Exception e) {

                log.error(
                        "Failed to sync user: {}",
                        user.path("id").asText(),
                        e
                );
            }
        }

        log.info(
                "Clerk sync complete. {} new users added.",
                synced
        );

        return synced;
    }

    private String extractPrimaryEmail(JsonNode user) {

        String primaryId =
                user.path("primary_email_address_id")
                        .asText("");

        JsonNode emails =
                user.path("email_addresses");

        if (emails.isArray()) {

            for (JsonNode email : emails) {

                if (email.path("id")
                        .asText()
                        .equals(primaryId)) {

                    return email.path("email_address")
                            .asText();
                }
            }

            // Fallback to first email
            if (!emails.isEmpty()) {
                return emails.get(0)
                        .path("email_address")
                        .asText();
            }
        }

        return "unknown@example.com";
    }
}