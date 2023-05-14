package com.example.backend.repository;

import com.example.backend.entity.FlightTrip;
import com.example.backend.entity.Traveller;
import com.example.backend.entity.User;

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

    @Query(value="SELECT * FROM traveller t where t.trip_id=?1 and t.seat_id=?2",nativeQuery = true)
    public List<Traveller> findByTripIdandSeatId(UUID tripId, UUID seatId);

    @Query(value="SELECT * from traveller t where t.user_id=?1",nativeQuery = true)
    public List<Traveller> findAllByUser(UUID user_id);

}
