package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightTrip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne
    @JoinColumn(name="airplane_id", nullable=false)
    private Airplane airplane;
    @ManyToOne
    @JoinColumn(name="depart_airport_id",nullable = false)
    private Airport departureAirport;

    @ManyToOne
    @JoinColumn(name="arr_airport_id",nullable = false)
    private Airport arrivalAirport;

    private LocalDateTime arrivalTime;
    private LocalDateTime departTime;
}
