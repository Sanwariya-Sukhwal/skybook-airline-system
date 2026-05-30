package com.skybook.controller;

import com.skybook.entity.Booking;
import com.skybook.enums.BookingStatus;
import com.skybook.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService service;

    // Create Booking
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {

        return service.createBooking(booking);
    }

    // Get All Bookings
    @GetMapping
    public List<Booking> getAllBookings() {

        return service.getAllBookings();
    }

    // Get Booking By ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {

        return service.getBookingById(id);
    }

    // Get Booking By Status
    @GetMapping("/status")
    public List<Booking> getByStatus(
            @RequestParam BookingStatus status) {

        return service.getBookingByStatus(status);
    }

    // Get Booking By Flight ID
    @GetMapping("/flight/{flightId}")
    public List<Booking> getByFlightId(
            @PathVariable Long flightId) {

        return service.getBookingByFlightId(flightId);
    }

    // Update Booking Status
    @PutMapping("/{id}")
    public Booking updateStatus(
            @PathVariable Long id,
            @RequestParam BookingStatus status) {

        return service.updateStatus(id, status);
    }

    // Cancel Booking
    @DeleteMapping("/{id}")
    public Booking cancelBooking(
            @PathVariable Long id) {

        return service.cancelBooking(id);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(
            @PathVariable Long userId) {

        return service.getBookingsByUserId(userId);
    }
}