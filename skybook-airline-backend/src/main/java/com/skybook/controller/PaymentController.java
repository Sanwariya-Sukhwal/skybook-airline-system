package com.skybook.controller;

import com.skybook.entity.Payment;
import com.skybook.enums.PaymentStatus;
import com.skybook.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    // Create Payment
    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {

        return service.createPayment(payment);
    }

    // Get Payment By ID
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {

        return service.getPaymentById(id);
    }

    // Get Payment By Status
    @GetMapping("/status")
    public List<Payment> getPaymentByStatus(
            @RequestParam PaymentStatus status) {

        return service.getPaymentByStatus(status);
    }

    // Get Payment By Booking ID
    @GetMapping("/booking/{bookingId}")
    public List<Payment> getPaymentByBookingId(
            @PathVariable Long bookingId) {

        return service.getPaymentByBookingId(bookingId);
    }
}