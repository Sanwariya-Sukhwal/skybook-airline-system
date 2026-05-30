package com.skybook.repository;

import com.skybook.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    List<Flight> findByFromLocationAndToLocation(
            String fromLocation,
            String toLocation
    );

    List<Flight> findByAirline(String airline);
}