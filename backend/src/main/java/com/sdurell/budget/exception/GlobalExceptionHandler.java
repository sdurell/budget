package com.sdurell.budget.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(StatementNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleStatementNotFound(StatementNotFoundException ex){
        Map<String, String> response = Map.of(
            "error", "Statement Not Found",
            "message", ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    
    @ExceptionHandler(DuplicateFilenameException.class)
    public ResponseEntity<Map<String, String>> handleDuplicate(DuplicateFilenameException ex){
        Map<String, String> response = Map.of(
            "error", "Duplicate Filename",
            "message", ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFound(UserNotFoundException ex){
        Map<String, String> response = Map.of(
            "error", "User Not Found",
            "message", ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleOtherExceptions(Exception ex){
        Map<String, String> response = Map.of(
            "error", "Server Error",
            "message", "Something went wrong. Please try again."
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
