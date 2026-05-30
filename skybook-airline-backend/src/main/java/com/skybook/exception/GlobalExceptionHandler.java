package com.skybook.exception;

import com.skybook.dto.ResponseStructure;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleResourceNotFound(ResourceNotFoundException ex) {

        ResponseStructure<String> structure = new ResponseStructure<>();

        structure.setStatus(HttpStatus.NOT_FOUND.value());
        structure.setMessage("Resource Not Found");
        structure.setData(ex.getMessage());

        return new ResponseEntity<>(structure, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseStructure<String>> handleException(Exception ex) {

        ResponseStructure<String> structure = new ResponseStructure<>();

        structure.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        structure.setMessage("Something Went Wrong");
        structure.setData(ex.getMessage());

        return new ResponseEntity<>(structure, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}