package com.example.backend.service;


import com.example.backend.dto.TravellerDto;
import com.example.backend.dto.TravellerListDto;
import com.example.backend.entity.FlightTrip;
import com.example.backend.entity.Seat;
import com.example.backend.entity.Traveller;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.FlightTripRepo;
import com.example.backend.repository.SeatRepo;
import com.example.backend.repository.TravellerRepo;
import com.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private TravellerRepo travellerRepo;

    @Autowired
    private UserRepo userRepo;


    @Autowired
    private FlightTripRepo flightTripRepo;

    @Autowired
    private SeatRepo seatRepo;


    public List<Traveller> book_tickets (TravellerListDto travellers){
        System.out.println(travellers);

        UUID booking_user_id = travellers.getBooking_user_id();

        UUID trip_id = travellers.getTrip_id();

        // get the user who booked the ticket for all
        User bookingUser = userRepo.findById(booking_user_id).orElseThrow(() -> new ResourceNotFoundException("User", " Id ",booking_user_id));;


        // get the trip
        FlightTrip flightTrip = flightTripRepo.findById(trip_id).orElseThrow(() -> new ResourceNotFoundException("FlightTrip", " Id ",trip_id));;


        List<Traveller> passengers = new ArrayList<>();

        // set the individual details for each person
        for(TravellerDto traveller : travellers.getTravellerList())
        {
            Traveller t = new Traveller();

            t.setUser(bookingUser);
            t.setFlightTrip(flightTrip);

            t.setName(traveller.getName());
            t.setAge(traveller.getAge());

            UUID seat_id = traveller.getSeat_id();

            Seat s = seatRepo.findById(seat_id).orElseThrow(() -> new ResourceNotFoundException("Seat"," Id ", seat_id));

            t.setSeat(s);

            //mark seat as booked
            seatRepo.setSeatStatusbyId(false,seat_id);

            passengers.add(t);
        }


        return travellerRepo.saveAll(passengers);
    }

}
