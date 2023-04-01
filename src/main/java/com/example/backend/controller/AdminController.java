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

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    AirplaneService airplaneService;
    @Autowired
    AirportService airportService;
    @Autowired
    FlightTripService flightTripService;

    @GetMapping("/demo")
    public ResponseEntity<?> demo_function(){
        return ResponseEntity.accepted().body("hello from admin");

    }

    @PostMapping("/add-airplane")
    public ResponseEntity<?>add_airplane(@RequestBody Airplane airplane){
        String ans =airplaneService.add_airplane(airplane);
        return ResponseEntity.accepted().body(airplane);

    }
    @GetMapping("/get-all-airplanes")
    public ResponseEntity<?>find_all_airplane(){
        List<Airplane> airplaneList= airplaneService.find_all_airplanes();
        return ResponseEntity.accepted().body(airplaneList);
    }
    @PostMapping("/add-airport")
    public ResponseEntity<?>add_airport(@RequestBody Airport airport){
        airportService.add_airport(airport);
        return ResponseEntity.accepted().body(airport);
    }
    @GetMapping ("/get-all-airport")
    public ResponseEntity<?>find_all_airports(){
        List<Airport>airportList = airportService.find_all_airports();
        return ResponseEntity.accepted().body(airportList);
    }
    @PostMapping("/add-flight-trips")
    public ResponseEntity<?>add_flight_trips(@RequestBody FlightTripRequest flightTripRequest){
        FlightTrip flightTrip = flightTripService.add_flight_trip(flightTripRequest);
        return ResponseEntity.accepted().body(flightTrip);
    }


}
