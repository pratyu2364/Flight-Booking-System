package com.example.backend.repository;

import com.example.backend.entity.Traveller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TravellerRepo extends JpaRepository<Traveller, UUID> {
    @Override
    Optional<Traveller> findById(UUID uuid);

    @Override
    <S extends Traveller> List<S> saveAll(Iterable<S> entities);
}
