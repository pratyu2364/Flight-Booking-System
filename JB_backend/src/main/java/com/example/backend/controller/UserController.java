package com.example.backend.controller;

import com.example.backend.dto.TravellerDto;
import com.example.backend.dto.TravellerListDto;
import com.example.backend.entity.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.FlightTripRepo;
import com.example.backend.repository.SeatRepo;
import com.example.backend.repository.TravellerRepo;
import com.example.backend.repository.UserRepo;
import com.example.backend.service.AirplaneService;
import com.example.backend.service.BookingService;
import com.example.backend.service.SeatService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
//@PreAuthorize("hasRole('USER')")
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @Autowired
    private SeatService seatService;

    @GetMapping("/demo")
    public ResponseEntity<?> demo_function() {
        return ResponseEntity.accepted().body("from authenticated user");
    }

    @PostMapping("/add-user")
    public ResponseEntity<?> addUser(@RequestBody User user)
    {
        System.out.println(user);
        User savedUser = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.OK)
                .body(savedUser);
    }

    @PostMapping("/book")
    public ResponseEntity<?> book_tickets (@RequestBody TravellerListDto travellers){
        List<Traveller> bookedPassengers = bookingService.book_tickets(travellers);

        return ResponseEntity.status(HttpStatus.OK)
                .body(bookedPassengers);
    }

    @GetMapping("/{trip_id}/get-all-seats")
    public ResponseEntity<?> get_all_seats(@PathVariable("trip_id") UUID tripId)
    {
         List<Seat> seats = seatService.find_all_by_tripid(tripId);
         return ResponseEntity.status(HttpStatus.OK).body(seats);
    }


}