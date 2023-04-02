package com.example.backend.service;

import com.example.backend.entity.Airport;
import com.example.backend.entity.Seat;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.SeatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SeatService {
    @Autowired
    private SeatRepo seatRepo;
    public String add_seat(Seat seat){
        seatRepo.save(seat);
        return "saved";
    }
    public List<Seat> find_all_seats_by_trip(){
        return seatRepo.findAll();
    }
    public Seat find_seat_by_id(UUID id){
        Seat seat = seatRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Seat", " Id ",id));
        return seat;
    }
    public List<Seat> find_all_by_tripid(UUID id){
        List<Seat>s = seatRepo.findAllByFlightTripId(id);
        return s;
    }
    public Seat bookSeat(UUID id) {
        Seat seat = find_seat_by_id(id);
        seat.setAvailability(false);
        add_seat(seat);
        return seat;
    }

}
