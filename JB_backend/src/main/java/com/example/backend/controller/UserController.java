package com.example.backend.controller;

import com.example.backend.dto.TravellerDto;
import com.example.backend.dto.TravellerListDto;
import com.example.backend.entity.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.FlightTripRepo;
import com.example.backend.repository.SeatRepo;
import com.example.backend.repository.TravellerRepo;
import com.example.backend.repository.UserRepo;
import com.example.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@PreAuthorize("hasRole('USER')")
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @Autowired
    private SeatService seatService;

    @Autowired
    private SearchService searchService;
    @Autowired
    private AirportService airportService;

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
    @GetMapping("/search-all")
    public  ResponseEntity<?>search(@RequestParam ("dept_city") String dept_city,@RequestParam("arr_city") String arr_city,@RequestParam("date") LocalDateTime date){
        System.out.println(dept_city+" "+arr_city+" "+date);
        List<FlightTrip>f_list =  searchService.Search(dept_city,arr_city,date);
        return ResponseEntity.status(HttpStatus.OK).body(f_list);
    }
    @GetMapping("/search-all-seats")
    public  ResponseEntity<?>search_seats(@RequestParam("dept_city") String dept_city,@RequestParam("arr_city") String arr_city,@RequestParam("date")LocalDateTime date,@RequestParam("seats_required") Integer seats_required){
        List<FlightTrip>f_list =  searchService.SearchBasedOnSeats(dept_city,arr_city,date,seats_required);
        return ResponseEntity.status(HttpStatus.OK).body(f_list);
    }
    @GetMapping ("/get-all-airport")
    public ResponseEntity<?>find_all_airports(){
        List<Airport>airportList = airportService.find_all_airports();
        return ResponseEntity.accepted().body(airportList);
    }


}
