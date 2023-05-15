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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@CrossOrigin(origins = {"http://localhost:3000","http://jahazbooker-frontend:3000","http://jahaz-booker.com"})
@RequestMapping("/user")
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);
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
       logger.info("Inside demo function");
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
        logger.info("[Book Tickets] - [POST]");
        List<Traveller> bookedPassengers = bookingService.book_tickets(travellers);

        return ResponseEntity.status(HttpStatus.OK)
                .body(bookedPassengers);
    }

    @GetMapping("/{trip_id}/get-all-seats")
    public ResponseEntity<?> get_all_seats(@PathVariable("trip_id") UUID tripId)
    {
         logger.info("[Get All Seats for a TripId] - [GET]");
         List<Seat> seats = seatService.find_all_by_tripid(tripId);
         return ResponseEntity.status(HttpStatus.OK).body(seats);
    }
    @GetMapping("/search-all")
    public  ResponseEntity<?>search(@RequestParam ("dept_city") String dept_city,@RequestParam("arr_city") String arr_city,@RequestParam("date") LocalDateTime date){
        logger.info("[Search based on Dept City, Arrival City, Date,] - [GET]");
        //System.out.println(dept_city+" "+arr_city+" "+date);
        List<FlightTrip>f_list =  searchService.Search(dept_city,arr_city,date);
        return ResponseEntity.status(HttpStatus.OK).body(f_list);
    }
    @GetMapping("/search-all-seats")
    public  ResponseEntity<?>search_seats(@RequestParam("dept_city") String dept_city,@RequestParam("arr_city") String arr_city,@RequestParam("date")LocalDateTime date,@RequestParam("seats_required") Integer seats_required){
        logger.info("[Search based on Dept City, Arrival City, Date, Seats Required] - [GET]");
        List<FlightTrip>f_list =  searchService.SearchBasedOnSeats(dept_city,arr_city,date,seats_required);
        return ResponseEntity.status(HttpStatus.OK).body(f_list);
    }
    @GetMapping ("/get-all-airport")
    public ResponseEntity<?>find_all_airports(){
        logger.info("[Find Airports] - [GET]");
        List<Airport>airportList = airportService.find_all_airports();
        return ResponseEntity.accepted().body(airportList);
    }

    @GetMapping(path = "/{tripId}/seats/available")
    public ResponseEntity<?> getAvailableSeats (@PathVariable UUID tripId){
        logger.info("[Get All Available Seats for a TripId] - [GET]");
        List<Seat> availableSeats = seatService.find_all_available_seats_by_tripid(tripId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(availableSeats);
    }

    @GetMapping(path = "/{tripId}/seats/all")
    public ResponseEntity<?> getAllSeats (@PathVariable UUID tripId){
        logger.info("[Get All Seats for a TripId] - [GET]");
        List<Seat> allSeats = seatService.find_all_by_tripid(tripId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(allSeats);
    }
    @GetMapping("/get-traveller/{email}")
    public ResponseEntity<?>getAllTravellers(@PathVariable String email){
        logger.info("[Get all Travellers with given user Email Id] - [GET]");
        List<Traveller>t_list = userService.findAllByUserEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(t_list);
    }



}
