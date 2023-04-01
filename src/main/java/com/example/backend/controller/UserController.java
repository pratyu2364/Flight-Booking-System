package com.example.backend.controller;

import com.example.backend.service.AirplaneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("/user")
public class UserController {


    @GetMapping("/demo")
    public ResponseEntity<?> demo_function() {
        return ResponseEntity.accepted().body("from authenticated user");
    }


}
