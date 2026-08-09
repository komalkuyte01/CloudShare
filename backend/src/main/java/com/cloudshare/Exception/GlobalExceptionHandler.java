package com.cloudshare.Exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles duplicate key / unique constraint violations from JPA/Hibernate.
     * JPA wraps these as DataIntegrityViolationException, NOT DuplicateKeyException.
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        Map<String, Object> data = new HashMap<>();
        data.put("status", HttpStatus.CONFLICT.value());
        data.put("message", "A record with this data already exists.");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(data);
    }

    /**
     * Handles business logic errors (e.g. "User not found") thrown as RuntimeException.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
        Map<String, Object> data = new HashMap<>();
        data.put("status", HttpStatus.BAD_REQUEST.value());
        data.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(data);
    }
}
