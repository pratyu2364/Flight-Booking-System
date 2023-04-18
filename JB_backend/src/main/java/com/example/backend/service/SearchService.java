package com.example.backend.service;

import com.example.backend.entity.Airport;
import com.example.backend.entity.FlightTrip;
import com.example.backend.repository.AirplaneRepo;
import com.example.backend.repository.AirportRepo;
import com.example.backend.repository.FlightTripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SearchService {
    @Autowired
    private FlightTripRepo flightTripRepo;

    public List<FlightTrip>Search(String departure_city, String arrival_city, LocalDateTime date){
        LocalDateTime date2 = date.plusHours(24);
        return flightTripRepo.findByArrivalCityAndDepartureCityAndDate(departure_city,arrival_city,date,date2);
    }
    public List<FlightTrip>SearchBasedOnSeats(String departure_city, String arrival_city, LocalDateTime date,Integer seats_required){
        LocalDateTime date2 = date.plusHours(24);
        return flightTripRepo.findByArrivalCityAndDepartureCityAndDateAndSeats(departure_city,arrival_city,date,date2,seats_required);
    }



}
