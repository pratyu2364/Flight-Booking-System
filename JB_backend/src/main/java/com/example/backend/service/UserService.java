package com.example.backend.service;

import com.example.backend.entity.Traveller;
import com.example.backend.entity.User;
import com.example.backend.repository.TravellerRepo;
import com.example.backend.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private UserRepo userRepo;
    private TravellerRepo travellerRepo;

    public User addUser(User user)
    {
        System.out.println(user);
        User savedUser = userRepo.save(user);
        return savedUser;
    }
    public List<Traveller> FindAllByUserEmail(String email)
    {
        User user = userRepo.findByEmail(email).orElseThrow();
        UUID id = user.getId();
        List<Traveller>t_list = travellerRepo.findAllByUser(id);
        return t_list;


    }

}
