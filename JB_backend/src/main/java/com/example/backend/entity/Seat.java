package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    @JoinColumn(name="trip_id",nullable = false)
    private FlightTrip flightTrip;
    private String  seatNumber;
    private boolean availability;
    private String type;
    private Integer prices;
}
