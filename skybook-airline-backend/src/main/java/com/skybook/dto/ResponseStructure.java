package com.skybook.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseStructure<T> {

    private int status;
    private String message;
    private T data;
}