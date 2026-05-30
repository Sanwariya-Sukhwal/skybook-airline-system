package com.skybook.service;

import com.skybook.entity.Flight;
import com.skybook.exception.ResourceNotFoundException;
import com.skybook.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository repository;

    // Add Flight
    public Flight addFlight(Flight flight) {
        return repository.save(flight);
    }

    // Get All Flights
    public List<Flight> getAllFlights() {
        return repository.findAll();
    }

    // Get Flight By ID
    public Flight getFlightById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Flight Not Found With ID : " + id));
    }

    // Search Flights
    public List<Flight> searchFlights(String from, String to) {

        return repository.findByFromLocationAndToLocation(from, to);
    }

    // Get Flights By Airline
    public List<Flight> getFlightsByAirline(String airline) {

        return repository.findByAirline(airline);
    }

    // Pagination & Sorting
    public Page<Flight> pagination(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        return repository.findAll(pageable);
    }

    // Update Flight
    public Flight updateFlight(Long id, Flight flight) {

        Flight oldFlight = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Flight Not Found With ID : " + id));

        oldFlight.setAirline(flight.getAirline());
        oldFlight.setFlightNumber(flight.getFlightNumber());

        oldFlight.setFromLocation(flight.getFromLocation());
        oldFlight.setToLocation(flight.getToLocation());

        oldFlight.setDate(flight.getDate());

        oldFlight.setDepartureTime(flight.getDepartureTime());
        oldFlight.setArrivalTime(flight.getArrivalTime());

        oldFlight.setPrice(flight.getPrice());
        oldFlight.setSeats(flight.getSeats());

        return repository.save(oldFlight);
    }

    // Delete Flight
    public void deleteFlight(Long id) {

        Flight flight = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Flight Not Found With ID : " + id));

        repository.delete(flight);
    }
}