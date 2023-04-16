package com.example.backend.service;

import com.example.backend.entity.Airplane;
import com.example.backend.entity.Airport;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.AirportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AirportService {
    @Autowired
    AirportRepo airportRepo;
    public String add_airport(Airport airport){
        airportRepo.save(airport);
        return "saved";
    }
    public List<Airport> find_all_airports(){
        return airportRepo.findAll();
    }
    public Airport find_airport_by_id(UUID id){
        Airport airport = airportRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Airport", " Id ",id));
        return airport;
    }
    public void delete_by_id(UUID id){
        Airport a = airportRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Airport", " Id ",id));
        airportRepo.delete(a);
    }
}
