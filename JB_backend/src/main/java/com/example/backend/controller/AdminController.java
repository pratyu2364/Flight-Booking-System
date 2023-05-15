package com.example.backend.controller;

import com.example.backend.entity.Airplane;
import com.example.backend.entity.Airport;
import com.example.backend.entity.FlightTrip;
import com.example.backend.payload.FlightTripRequest;
import com.example.backend.service.AirplaneService;
import com.example.backend.service.AirportService;
import com.example.backend.service.FlightTripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","http://jahazbooker-frontend:3000","http://jahaz-booker.com"})
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    AirplaneService airplaneService;
    @Autowired
    AirportService airportService;
    @Autowired
    FlightTripService flightTripService;

    @GetMapping("/demo")
    public ResponseEntity<?> demo_function(){
        logger.info("[Testing function for Admin] - [GET]");
        return ResponseEntity.accepted().body("hello from admin");

    }

    @PostMapping("/add-airplane")
    public ResponseEntity<?>add_airplane(@RequestBody Airplane airplane){
        logger.info("[Add Airplane] - [POST]");
        String ans =airplaneService.add_airplane(airplane);
        return ResponseEntity.accepted().body(airplane);

    }
    @GetMapping("/get-all-airplanes")
    public ResponseEntity<?>find_all_airplane(){
        logger.info("[Find all Airplanes] - [GET]");
        List<Airplane> airplaneList= airplaneService.find_all_airplanes();
        return ResponseEntity.accepted().body(airplaneList);
    }
    @DeleteMapping("/delete-airplane/{id}")
    public  ResponseEntity<?>delete_airplane(@PathVariable("id") UUID id){
        logger.info("[Delete Airplane with Id] - [DELETE]");
        airplaneService.delete_by_id(id);
        return ResponseEntity.accepted().body("deleted");
    }
    @PostMapping("/add-airport")
    public ResponseEntity<?>add_airport(@RequestBody Airport airport){
        logger.info("[Add Airport] - [POST]");
        airportService.add_airport(airport);
        return ResponseEntity.accepted().body(airport);
    }
    @GetMapping ("/get-all-airport")
    public ResponseEntity<?>find_all_airports(){
        logger.info("[Find all Airports] - [GET]");
        List<Airport>airportList = airportService.find_all_airports();
        return ResponseEntity.accepted().body(airportList);
    }
    @DeleteMapping("/delete-airport/{id}")
    public  ResponseEntity<?>delete_airport(@PathVariable("id") UUID id){
        logger.info("[Delete Airport] - [DELETE]");
        airportService.delete_by_id(id);
        return ResponseEntity.accepted().body("deleted");
    }
    @PostMapping("/add-flight-trips")
    public ResponseEntity<?>add_flight_trips(@RequestBody FlightTripRequest flightTripRequest){
        logger.info("[Add Flight Trip] - [POST]");
        FlightTrip flightTrip = flightTripService.add_flight_trip(flightTripRequest);
        return ResponseEntity.accepted().body(flightTrip);
    }
    @GetMapping ("/get-all-flight-trips")
    public ResponseEntity<?>find_all_flight_trips(){
        logger.info("[Find all Flight Trips] - [GET]");
        List<FlightTrip> f_list= flightTripService.find_all_flight_trips();
        return ResponseEntity.accepted().body(f_list);
    }
    @DeleteMapping("/delete-flight-trip/{id}")
    public ResponseEntity<?>delete_flight_trip(@PathVariable("id") UUID id){
        flightTripService.delete_by_id(id);
        logger.info("[Delete Flight Trips] - [DELETE]");
        return ResponseEntity.accepted().body("deleted");
    }




}
