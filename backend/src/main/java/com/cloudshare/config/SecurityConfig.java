package com.cloudshare.config;

import com.cloudshare.security.ClerkJwtAuthFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final ClerkJwtAuthFilter clerkJwtAuthFilter;

    @Bean
    public FilterRegistrationBean<ClerkJwtAuthFilter> clerkJwtAuthFilterRegistration(
            ClerkJwtAuthFilter filter) {

        FilterRegistrationBean<ClerkJwtAuthFilter> registration =
                new FilterRegistrationBean<>(filter);

        registration.setEnabled(false);

        return registration;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                // REST API does not use browser sessions/forms
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(Customizer.withDefaults())

                // JWT authentication → stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // Return proper 401/403 JSON responses instead of Spring defaults
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint())
                        .accessDeniedHandler(accessDeniedHandler())
                )

                // Authorization rules
                .authorizeHttpRequests(auth -> auth

                        // Clerk webhook does not use user JWT
                        .requestMatchers("/webhooks/**").permitAll()

                        // Public file & contact endpoints
                        .requestMatchers("/files/public/**").permitAll()
                        .requestMatchers("/files/download/**").permitAll()
                        .requestMatchers("/contact/**", "/contact").permitAll()
                        .requestMatchers("/uploads/**").permitAll()

                        // Allow Spring Boot's error dispatch (internal forward on exceptions)
                        .requestMatchers("/error").permitAll()

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )

                // Run Clerk JWT filter before Spring's username/password filter
                .addFilterBefore(
                        clerkJwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    /**
     * Returns 401 Unauthorized with a JSON body when a request
     * reaches a protected endpoint without valid authentication.
     * Without this, Spring Security silently returns 403 Forbidden.
     */
    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, authException) -> {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            Map<String, Object> body = Map.of(
                    "status", 401,
                    "error", "Unauthorized",
                    "message", "Authentication is required. Please provide a valid Bearer token.",
                    "path", request.getRequestURI()
            );

            new ObjectMapper().writeValue(response.getOutputStream(), body);
        };
    }

    /**
     * Returns 403 Forbidden with a JSON body when an authenticated user
     * tries to access a resource they don't have permission for.
     */
    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            Map<String, Object> body = Map.of(
                    "status", 403,
                    "error", "Forbidden",
                    "message", "You do not have permission to access this resource.",
                    "path", request.getRequestURI()
            );

            new ObjectMapper().writeValue(response.getOutputStream(), body);
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // Support any origin pattern (localhost, Vercel preview/production, custom domains)
        config.setAllowedOriginPatterns(List.of("*"));

        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin",
                "X-Requested-With",
                "ngrok-skip-browser-warning",
                "Access-Control-Request-Headers",
                "Access-Control-Request-Method"
        ));

        config.setExposedHeaders(List.of(
                "Content-Disposition",
                "Authorization"
        ));

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}