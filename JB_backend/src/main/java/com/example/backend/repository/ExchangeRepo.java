package com.example.backend.repository;

import com.example.backend.entity.ExchangeRequest;
import com.example.backend.entity.Traveller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExchangeRepo extends JpaRepository<ExchangeRequest, UUID> {
    @Override
    Optional<ExchangeRequest> findById(UUID uuid);

    @Override
    <S extends ExchangeRequest> S save(S entity);    
}
