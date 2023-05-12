package com.example.backend.service;

import com.example.backend.controller.UserController;
import com.example.backend.entity.Airplane;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.AirplaneRepo;
import com.example.backend.repository.AirportRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AirplaneService {
    Logger logger = LoggerFactory.getLogger(AirplaneService.class);
    @Autowired
    private AirplaneRepo airplaneRepo;
    public String add_airplane(Airplane airplane){
        airplaneRepo.save(airplane);
        logger.info("[ADDED AIRPLANE WITH ID: "+airplane.getId());
        return "saved";
    }
    public List<Airplane>find_all_airplanes(){
        logger.info("[FIND ALL AIRPLANES WITH ID]");
        return airplaneRepo.findAll();
    }
    public Airplane find_airplane_by_id(UUID id){
        logger.info("[FIND AIRPLANE WITH ID: "+id);
        Airplane a = airplaneRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Airplane", " Id ",id));
        return a;
    }
    public void delete_by_id(UUID id){
        Airplane a = airplaneRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Airplane", " Id ",id));
        logger.info("[DELETE AIRPLANE WITH ID: "+id);
        airplaneRepo.delete(a);
    }

}
