package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    @JoinColumn(name="trip_id",nullable = false)
    private FlightTrip flightTrip;
    private String  seatNumber;
    private boolean availability;
    private String type;
    private Integer prices;
}
