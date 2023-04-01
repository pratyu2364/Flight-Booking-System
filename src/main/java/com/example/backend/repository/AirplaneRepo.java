package com.example.backend.repository;

import com.example.backend.entity.Airplane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface AirplaneRepo extends JpaRepository<Airplane, UUID> {
}
