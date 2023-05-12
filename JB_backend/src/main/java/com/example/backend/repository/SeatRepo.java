package com.example.backend.repository;

import com.example.backend.entity.Seat;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SeatRepo extends JpaRepository<Seat, UUID>{
     Optional<Seat>findById(UUID id);
     List<Seat>findAllByFlightTripId(UUID id);

     @Transactional
     @Modifying
     @Query("update Seat s set s.availability = ?1 where s.id = ?2")
     void setSeatStatusbyId(Boolean seatStatus , UUID seatId);

     @Transactional
     @Query(value = "select * from seat where trip_id=?1 and availability = 1", nativeQuery = true)
     public List<Seat> findAllAvailableByFlightTripId(UUID tripId);
}