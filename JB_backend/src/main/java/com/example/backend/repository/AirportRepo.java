package com.example.backend.repository;

import com.example.backend.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface AirportRepo extends JpaRepository<Airport, UUID> {
    public Optional<Airport> findById(UUID id);
}
