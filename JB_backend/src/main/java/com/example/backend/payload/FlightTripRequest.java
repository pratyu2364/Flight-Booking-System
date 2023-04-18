package com.example.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightTripRequest {
    private UUID airportDepartureId;
    private UUID airportArrivalId;
    private UUID flightId;
    private LocalDateTime arrivalTime;
    private LocalDateTime departTime;

    private Integer price;

}
