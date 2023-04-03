package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepo userRepo;

    public User addUser(User user)
    {
        System.out.println(user);
        User savedUser = userRepo.save(user);
        return savedUser;
    }
}
