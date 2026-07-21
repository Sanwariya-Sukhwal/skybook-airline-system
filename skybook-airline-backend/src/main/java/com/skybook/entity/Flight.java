package com.skybook.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String airline;

    private String flightNumber;

    @NotBlank
    private String fromLocation;

    @NotBlank
    private String toLocation;

    private String date;

    private String departureTime;

    private String arrivalTime;

    private double price;

    @Min(1)
    private int seats;
    
    // If true, this flight operates every day (recurring daily)
    private boolean everyday = false;
}