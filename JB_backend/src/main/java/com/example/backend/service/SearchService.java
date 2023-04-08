package com.example.backend.service;

import com.example.backend.entity.Airport;
import com.example.backend.repository.AirportRepo;
import com.example.backend.repository.FlightTripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
    @Autowired
    private FlightTripRepo flightTripRepo;
    @Autowired
    private AirportRepo airportRepo;

}
