package com.example.backend.repository;

import com.example.backend.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SeatRepo extends JpaRepository<Seat, UUID>{
     Optional<Seat>findById(UUID id);
     List<Seat>findAllByFlightTripId(UUID id);

}