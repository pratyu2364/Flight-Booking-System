package com.example.backend.repository;

import com.example.backend.entity.Traveller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TravellerRepo extends JpaRepository<Traveller, UUID> {


}
