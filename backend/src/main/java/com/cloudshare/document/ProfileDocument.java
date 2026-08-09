package com.cloudshare.document;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDocument {

    private String clerkId;
    private String email;
    private String firstName;
    private String lastName;
    private String photoUrl;

    private String plan = "BASIC";
    private Integer credits = 5;

    public static ProfileDocument fromClerkWebhook(JsonNode data) {

        String clerkId = data.path("id").asText();
        String email = extractPrimaryEmail(data);
        String firstName = data.path("first_name").asText("");
        String lastName = data.path("last_name").asText("");
        String photoUrl = data.path("image_url").asText("");

        return ProfileDocument.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName.isEmpty() ? "User" : firstName)
                .lastName(lastName)
                .photoUrl(photoUrl)
                .plan("BASIC")
                .credits(5)
                .build();
    }

    private static String extractPrimaryEmail(JsonNode data) {
        JsonNode emails = data.path("email_addresses");
        if (emails.isArray() && emails.size() > 0) {
            return emails.get(0).path("email_address").asText("");
        }
        return "";
    }
}