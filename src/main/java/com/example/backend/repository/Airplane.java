package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface Airplane extends JpaRepository<Airplane, UUID> {
}
