package com.skybook.controller;

import com.skybook.entity.Passenger;
import com.skybook.service.PassengerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/passengers")
@RequiredArgsConstructor
public class PassengerController {

    private final PassengerService service;

    @PostMapping
    public Passenger addPassenger(@RequestBody Passenger passenger) {
        return service.addPassenger(passenger);
    }

    @GetMapping
    public List<Passenger> getAllPassengers() {
        return service.getAllPassengers();
    }

    @GetMapping("/{id}")
    public Passenger getPassengerById(@PathVariable Long id) {
        return service.getPassengerById(id);
    }

    @GetMapping("/contact/{number}")
    public Passenger getByContact(@PathVariable String number) {
        return service.getByContact(number);
    }

    @GetMapping("/page")
    public Page<Passenger> pagination(@RequestParam int page,
                                      @RequestParam int size) {

        return service.pagination(page, size);
    }

    @PutMapping("/{id}")
    public Passenger updatePassenger(@PathVariable Long id,
                                     @RequestBody Passenger passenger) {

        return service.updatePassenger(id, passenger);
    }
}