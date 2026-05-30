package com.skybook.repository;

import com.skybook.entity.Payment;
import com.skybook.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByBookingId(Long bookingId);
}