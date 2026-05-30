package com.skybook.repository;

import com.skybook.entity.Booking;
import com.skybook.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByFlightId(Long flightId);
    List<Booking> findByUserId(Long userId);
}