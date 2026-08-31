package com.cloudshare.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.net.URL;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ClerkJwksProvider {

    @Value("${clerk.jwks-url}")
    private String jwksUrl;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, PublicKey> keyCache = new ConcurrentHashMap<>();

    private long lastFetchTime = 0;

    private static final long CACHE_TTL = 3600000;

    public PublicKey getPublicKey(String kid) throws Exception {

        if (keyCache.containsKey(kid)
                && System.currentTimeMillis() - lastFetchTime < CACHE_TTL) {
            return keyCache.get(kid);
        }

        refreshKeys();

        PublicKey publicKey = keyCache.get(kid);

        if (publicKey == null) {
            throw new IllegalArgumentException(
                    "No public key found for kid: " + kid
            );
        }

        return publicKey;
    }

    private void refreshKeys() throws Exception {

        java.net.URLConnection connection = java.net.URI.create(jwksUrl).toURL().openConnection();
        connection.setConnectTimeout(5000);
        connection.setReadTimeout(5000);
        
        JsonNode jwks = objectMapper.readTree(connection.getInputStream());

        JsonNode keys = jwks.get("keys");

        for (JsonNode key : keys) {

            String kid = key.get("kid").asText();
            String kty = key.get("kty").asText();
            String alg = key.get("alg").asText();

            if ("RSA".equals(kty) && "RS256".equals(alg)) {

                String n = key.get("n").asText();
                String e = key.get("e").asText();

                PublicKey publicKey = createPublicKey(n, e);

                keyCache.put(kid, publicKey);
            }
        }

        lastFetchTime = System.currentTimeMillis();
    }

    private PublicKey createPublicKey(String modulus, String exponent) throws Exception {

        byte[] modulusBytes = Base64.getUrlDecoder().decode(modulus);
        byte[] exponentBytes = Base64.getUrlDecoder().decode(exponent);

        BigInteger modulusBigInteger = new BigInteger(1, modulusBytes);
        BigInteger exponentBigInteger = new BigInteger(1, exponentBytes);

        RSAPublicKeySpec spec =
                new RSAPublicKeySpec(modulusBigInteger, exponentBigInteger);

        KeyFactory factory = KeyFactory.getInstance("RSA");

        return factory.generatePublic(spec);
    }
}