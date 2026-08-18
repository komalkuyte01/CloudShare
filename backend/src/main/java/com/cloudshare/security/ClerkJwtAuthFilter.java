package com.cloudshare.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    @Value("${clerk.issuer}")
    private String clerkIssuer;

    private final ClerkJwksProvider jwksProvider;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Skip CORS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Skip webhook requests and public endpoints
        if (request.getRequestURI().contains("/webhooks")
                || request.getRequestURI().contains("/public")
                || request.getRequestURI().contains("/download")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        // Authorization header missing or invalid
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Authorization header missing or invalid"
            );
            return;
        }

        try {
            String token = authHeader.substring(7);

            String[] chunks = token.split("\\.");

            if (chunks.length != 3) {
                response.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Invalid JWT token"
                );
                return;
            }

            // Decode JWT header
            String headerJson = new String(
                    Base64.getUrlDecoder().decode(chunks[0]),
                    StandardCharsets.UTF_8
            );

            JsonNode headerNode = objectMapper.readTree(headerJson);

            // Check if kid exists
            if (!headerNode.has("kid")) {
                response.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Token header is missing kid"
                );
                return;
            }

            String kid = headerNode.get("kid").asText();

            PublicKey publicKey = jwksProvider.getPublicKey(kid);

            // Validate that the signing key is an RSA public key
            if (!(publicKey instanceof java.security.interfaces.RSAPublicKey rsaPublicKey)) {
                response.sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Unknown JWT signing key"
                );
                return;
            }

            Claims claims = Jwts.parser()
                    .verifyWith(rsaPublicKey)
                    .clockSkewSeconds(300)
                    .requireIssuer(clerkIssuer)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String clerkId = claims.getSubject();

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            clerkId,
                            null,
                            Collections.singletonList(
                                    new SimpleGrantedAuthority("ROLE_USER")
                            )
                    );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authenticationToken);

        } catch (Exception e) {
            e.printStackTrace();

            response.sendError(
                    HttpServletResponse.SC_FORBIDDEN,
                    "JWT Error: " + e.getMessage()
            );
            return;
        }

        
        // Continue filter chain only once
        filterChain.doFilter(request, response);
    }
}