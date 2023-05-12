package com.example.backend.service;

import com.example.backend.dto.TravellerDto;
import com.example.backend.dto.TravellerListDto;
import com.example.backend.entity.ExchangeRequest;
import com.example.backend.entity.FlightTrip;
import com.example.backend.entity.Seat;
import com.example.backend.entity.Traveller;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.ExchangeRepo;
import com.example.backend.repository.FlightTripRepo;
import com.example.backend.repository.SeatRepo;
import com.example.backend.repository.TravellerRepo;
import com.example.backend.repository.UserRepo;

import org.hibernate.boot.model.TruthValue;
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

    @Autowired
    private ExchangeRepo exchangeRepo;

    public List<Traveller> book_tickets(TravellerListDto travellers) {
        System.out.println(travellers);

        // UUID booking_user_id = travellers.getBookingUserId();

        String booking_user_email = travellers.getBookingUserEmailId();

        UUID trip_id = travellers.getTripId();

        // get the user who booked the ticket for all
        User bookingUser = userRepo.findByEmail(booking_user_email)
                .orElseThrow(() -> new ResourceNotFoundException("User", " Id ", null));

        // get the trip for which the ticket is booked
        FlightTrip flightTrip = flightTripRepo.findById(trip_id)
                .orElseThrow(() -> new ResourceNotFoundException("FlightTrip", " Id ", trip_id));
        ;

        List<Traveller> savedPassengers = new ArrayList<>();

        // set the individual details for each person
        for (TravellerDto traveller : travellers.getTravellerList()) {
            Traveller t = new Traveller();

            t.setUser(bookingUser);
            t.setFlightTrip(flightTrip);

            t.setName(traveller.getName());
            t.setAge(traveller.getAge());

            UUID seat_id = traveller.getSeatId();

            Seat bookedSeat = seatRepo.findById(seat_id)
                    .orElseThrow(() -> new ResourceNotFoundException("Seat", " Id ", seat_id));

            t.setSeat(bookedSeat);

            // mark seat as booked
            seatRepo.setSeatStatusbyId(false, seat_id);

            // save traveller in db and get his auto generated traveller id

            System.out.println("Traveller info: "+ t.toString());

            Traveller savedTraveller = travellerRepo.save(t);

            

            // create an exchange request using traveller id of requested seat id and the
            // current traveeler id received in previous step

            
            // get requested seat traveller id
            UUID requested_seat_id = traveller.getExchangeSeatId();
            System.out.println("requested Seat id: " + requested_seat_id);

            if (requested_seat_id != null) {

                
                List<Traveller> askedTravellers = travellerRepo.findByTripIdandSeatId(trip_id, requested_seat_id);            
            
                Traveller requestedTraveller = askedTravellers.get(0);

                ExchangeRequest exchangeRequest = new ExchangeRequest();
                exchangeRequest.setRequestorTraveller(savedTraveller);
                exchangeRequest.setRequestedTraveller(requestedTraveller);

                exchangeRepo.save(exchangeRequest);
            }

            savedPassengers.add(savedTraveller);
            // passengers.add(t);
        }

        // return travellerRepo.saveAll(passengers);
        return savedPassengers;
    }

}
