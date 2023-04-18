package com.example.backend.service;

import com.example.backend.entity.Airplane;
import com.example.backend.entity.Airport;
import com.example.backend.entity.FlightTrip;
import com.example.backend.entity.Seat;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.payload.FlightTripRequest;
import com.example.backend.repository.FlightTripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class FlightTripService {
    @Autowired
    FlightTripRepo flightTripRepo;
    @Autowired
    AirportService airportService;
    @Autowired
    SeatService seatService;

    @Autowired
    AirplaneService airplaneService;
    public FlightTrip add_flight_trip(FlightTripRequest flightTripRequest){
        Airport departAirport = airportService.find_airport_by_id(flightTripRequest.getAirportDepartureId());
        Airport arrivalAirport =airportService.find_airport_by_id(flightTripRequest.getAirportArrivalId());
        Airplane airplane = airplaneService.find_airplane_by_id(flightTripRequest.getFlightId());
        FlightTrip f = new FlightTrip();
        f.setArrivalTime(flightTripRequest.getArrivalTime());
        f.setDepartTime(flightTripRequest.getDepartTime());
        f.setAirplane(airplane);
        f.setArrivalAirport(arrivalAirport);
        f.setDepartureAirport(departAirport);
        f.setPrice(flightTripRequest.getPrice());
        int val = airplane.getSeatingCapacity();
        flightTripRepo.save(f);
        for(int i = 0;i<val;i++){
            Seat s = new Seat();
            s.setAvailability(true);
            s.setType("economy");
            s.setPrices(3000);
            s.setSeatNumber(Integer.toString(i));
            s.setFlightTrip(f);
            seatService.add_seat(s);
        }
        return f;
    }
    public List<FlightTrip> find_all_flight_trips(){
        return flightTripRepo.findAll();
    }
    public FlightTrip find_flight_trip_by_id(UUID id){
        return flightTripRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Flight Trip", " Id ",id));
    }
    public void delete_by_id(UUID id){
        FlightTrip a = flightTripRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Flight Trip", " Id ",id));
        flightTripRepo.delete(a);
    }
}
