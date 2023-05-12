package com.example.backend.repository;

import com.example.backend.entity.FlightTrip;
import com.example.backend.entity.Traveller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TravellerRepo extends JpaRepository<Traveller, UUID> {
    @Override
    Optional<Traveller> findById(UUID uuid);

    @Override
    <S extends Traveller> List<S> saveAll(Iterable<S> entities);

    // @Override
    // @Query("select t.id from Traveller t where t.tripId=?1 and t.seatId=?2")
    <S extends Traveller> List<S> findByFlightTripIdAndSeatId(UUID trip_id, UUID seat_id);
}
