package com.skybook.service;

import com.skybook.entity.Booking;
import com.skybook.entity.Payment;
import com.skybook.enums.BookingStatus;
import com.skybook.enums.PaymentStatus;
import com.skybook.exception.ResourceNotFoundException;
import com.skybook.repository.BookingRepository;
import com.skybook.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repository;
    private final BookingRepository bookingRepository;

    // Create Payment
    public Payment createPayment(Payment payment) {

        Long bookingId = payment.getBooking().getId();

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking Not Found With ID : " + bookingId));

        payment.setBooking(booking);

        Payment savedPayment =
                repository.save(payment);

        if (payment.getStatus()
                == PaymentStatus.SUCCESS) {

            booking.setStatus(
                    BookingStatus.BOOKED
            );

            bookingRepository.save(booking);
        }

        return savedPayment;
    }

    // Get Payment By ID
    public Payment getPaymentById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment Not Found With ID : " + id));
    }

    // Get Payment By Status
    public List<Payment> getPaymentByStatus(PaymentStatus status) {

        return repository.findByStatus(status);
    }

    // Get Payment By Booking ID
    public List<Payment> getPaymentByBookingId(Long bookingId) {

        return repository.findByBookingId(bookingId);
    }
}