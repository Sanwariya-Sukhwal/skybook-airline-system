package com.skybook.service;

import com.skybook.entity.Booking;
import com.skybook.entity.Flight;
import com.skybook.entity.User;
import com.skybook.enums.BookingStatus;
import com.skybook.exception.ResourceNotFoundException;
import com.skybook.repository.BookingRepository;
import com.skybook.repository.FlightRepository;
import com.skybook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repository;
    private final UserRepository userRepository;
    private final FlightRepository flightRepository;

    // Create Booking
    public Booking createBooking(Booking booking) {

        Long userId = booking.getUser().getId();
        Long flightId = booking.getFlight().getId();

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User Not Found With ID : " + userId));

        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Flight Not Found With ID : " + flightId));

        booking.setUser(user);
        booking.setFlight(flight);

        return repository.save(booking);
    }

    // Get All Bookings
    public List<Booking> getAllBookings() {

        return repository.findAll();
    }

    // Get Booking By ID
    public Booking getBookingById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking Not Found With ID : " + id));
    }

    // Get Booking By Status
    public List<Booking> getBookingByStatus(BookingStatus status) {

        return repository.findByStatus(status);
    }

    // Get Booking By Flight ID
    public List<Booking> getBookingByFlightId(Long flightId) {

        return repository.findByFlightId(flightId);
    }

    // Update Booking Status
    public Booking updateStatus(Long id, BookingStatus status) {

        Booking booking = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking Not Found With ID : " + id));

        booking.setStatus(status);

        return repository.save(booking);
    }

    // Cancel Booking
    public Booking cancelBooking(Long id) {

        Booking booking = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking Not Found"));

        booking.setStatus(
                BookingStatus.CANCELLED
        );

        return repository.save(booking);
    }

    public List<Booking> getBookingsByUserId(Long userId) {

        return repository.findByUserId(userId);
    }
}