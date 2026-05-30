package com.skybook.service;

import com.skybook.entity.Passenger;
import com.skybook.repository.PassengerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PassengerService {

    private final PassengerRepository repository;

    public Passenger addPassenger(Passenger passenger) {
        return repository.save(passenger);
    }

    public List<Passenger> getAllPassengers() {
        return repository.findAll();
    }

    public Passenger getPassengerById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Passenger getByContact(String number) {
        return repository.findByContactNumber(number)
                .orElseThrow();
    }

    public Page<Passenger> pagination(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return repository.findAll(pageable);
    }

    public Passenger updatePassenger(Long id, Passenger passenger) {

        Passenger old = repository.findById(id).orElseThrow();

        old.setName(passenger.getName());
        old.setAge(passenger.getAge());
        old.setGender(passenger.getGender());
        old.setContactNumber(passenger.getContactNumber());
        old.setEmail(passenger.getEmail());

        return repository.save(old);
    }
}