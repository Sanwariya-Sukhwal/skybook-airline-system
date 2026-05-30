package com.skybook.entity;

import com.skybook.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Flight flight;

    private int passengers;

    private String createdAt;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;
}