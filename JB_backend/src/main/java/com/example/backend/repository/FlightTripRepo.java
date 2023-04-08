package com.example.backend.repository;

import com.example.backend.entity.FlightTrip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FlightTripRepo extends JpaRepository<FlightTrip, UUID> {
    public Optional<FlightTrip>findById(UUID id);

}
