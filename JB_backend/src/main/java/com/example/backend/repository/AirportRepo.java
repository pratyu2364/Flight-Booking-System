package com.example.backend.repository;

import com.example.backend.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AirportRepo extends JpaRepository<Airport, UUID> {
    public Optional<Airport> findById(UUID id);
}
