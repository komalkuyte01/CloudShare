package com.cloudshare.exception;

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
     * Handles resource not found errors — returns 404 Not Found.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex) {
        Map<String, Object> data = new HashMap<>();
        data.put("status", HttpStatus.NOT_FOUND.value());
        data.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(data);
    }

    /**
     * Handles permission / access denied errors — returns 403 Forbidden.
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex) {
        Map<String, Object> data = new HashMap<>();
        data.put("status", HttpStatus.FORBIDDEN.value());
        data.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(data);
    }

    /**
     * Handles business logic errors (e.g. "Not enough credits") thrown as RuntimeException.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
        Map<String, Object> data = new HashMap<>();
        data.put("status", HttpStatus.BAD_REQUEST.value());
        data.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(data);
    }
}
