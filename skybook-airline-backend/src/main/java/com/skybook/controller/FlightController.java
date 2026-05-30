package com.skybook.controller;

import com.skybook.entity.Flight;
import com.skybook.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flights")
@RequiredArgsConstructor
public class FlightController {

    private final FlightService service;

    @PostMapping
    public Flight addFlight(@RequestBody Flight flight) {
        return service.addFlight(flight);
    }

    @GetMapping
    public List<Flight> getAllFlights() {
        return service.getAllFlights();
    }

    @GetMapping("/{id}")
    public Flight getFlightById(@PathVariable Long id) {
        return service.getFlightById(id);
    }

    @GetMapping("/search")
    public List<Flight> searchFlights(
            @RequestParam String from,
            @RequestParam String to) {

        return service.searchFlights(from, to);
    }

    @GetMapping("/airline/{airline}")
    public List<Flight> getByAirline(@PathVariable String airline) {
        return service.getFlightsByAirline(airline);
    }

    @GetMapping("/page")
    public Page<Flight> pagination(@RequestParam int page,
                                   @RequestParam int size,
                                   @RequestParam String sortBy) {
        return service.pagination(page, size, sortBy);
    }

    @PutMapping("/{id}")
    public Flight updateFlight(@PathVariable Long id,
                               @RequestBody Flight flight) {
        return service.updateFlight(id, flight);
    }

    @DeleteMapping("/{id}")
    public String deleteFlight(@PathVariable Long id) {
        service.deleteFlight(id);
        return "Flight Deleted";
    }
}