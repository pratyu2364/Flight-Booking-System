package com.example.backend.service;


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

    public Seat find_seat_by_id(UUID id){
        Seat seat = seatRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Seat", " Id ",id));
        return seat;
    }
    public List<Seat> find_all_by_tripid(UUID id){
        return seatRepo.findAllByFlightTripId(id);
    }
    public Seat bookSeat(UUID id) {
        Seat seat = find_seat_by_id(id);
        seat.setAvailability(false);
        add_seat(seat);
        return seat;
    }
    public void delete_by_id(UUID id){
        Seat a = seatRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("seat", " Id ",id));
        seatRepo.delete(a);
    }

    public List<Seat> find_all_available_seats_by_tripid(UUID tripId){
        return seatRepo.findAllAvailableByFlightTripId(tripId);
    }

}
