package com.cloudshare.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
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
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    @Value("${clerk.issuer}")
    private String clerkIssuer;

    private final ClerkJwksProvider jwksProvider;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // Skip CORS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Skip webhook requests and public endpoints
        String uri = request.getRequestURI();
        if (uri.contains("/webhooks")
                || uri.contains("/public")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        // No Authorization header — let Spring Security's AuthenticationEntryPoint handle it
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.debug("No Bearer token found for {} {}", request.getMethod(), uri);
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = authHeader.substring(7).trim();

            String[] chunks = token.split("\\.");

            if (chunks.length != 3) {
                writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Invalid JWT format — token must have 3 parts", uri);
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
                writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Token header is missing 'kid' claim", uri);
                return;
            }

            String kid = headerNode.get("kid").asText();

            PublicKey publicKey = jwksProvider.getPublicKey(kid);

            // Validate that the signing key is an RSA public key
            if (!(publicKey instanceof java.security.interfaces.RSAPublicKey rsaPublicKey)) {
                writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Unsupported JWT signing key type", uri);
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

            log.debug("JWT authenticated user: {}", clerkId);

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

        } catch (ExpiredJwtException e) {
            log.warn("JWT expired for {} {} — token expired at {}",
                    request.getMethod(), uri, e.getClaims().getExpiration());

            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                    "JWT token has expired. Please refresh your session.", uri);
            return;

        } catch (Exception e) {
            log.error("JWT authentication failed for {} {}: {}",
                    request.getMethod(), uri, e.getMessage(), e);

            writeErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                    "JWT authentication failed: " + e.getMessage(), uri);
            return;
        }

        // Continue filter chain only once
        filterChain.doFilter(request, response);
    }

    /**
     * Writes a JSON error response directly to the output stream.
     * Using sendError() can cause Spring Security to overwrite the status
     * code (e.g., turning 401 into 403), so we write the response manually.
     */
    private void writeErrorResponse(
            HttpServletResponse response,
            int status,
            String message,
            String path
    ) throws IOException {
        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        Map<String, Object> body = Map.of(
                "status", status,
                "error", status == 401 ? "Unauthorized" : "Forbidden",
                "message", message,
                "path", path
        );

        objectMapper.writeValue(response.getOutputStream(), body);
    }
}