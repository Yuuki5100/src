package com.example.jems.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorCodeRequest {
    private String locale;
    private String message;
}
