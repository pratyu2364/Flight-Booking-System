package com.example.backend.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Traveller {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "trip_id",nullable = false)
    private FlightTrip flightTrip;

    @ManyToOne
    @JoinColumn(name="seat_id",nullable = false)
    private Seat seat;
    private String name;
    private Integer age;
}
