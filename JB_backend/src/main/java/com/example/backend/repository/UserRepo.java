package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepo extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);
    @Override
    Optional<User> findById(UUID uuid);

    boolean existsByEmail(String email);
    boolean existsById(UUID id);
}
