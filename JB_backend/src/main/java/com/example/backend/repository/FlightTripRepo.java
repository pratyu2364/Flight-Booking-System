package com.example.backend.repository;

import com.example.backend.entity.FlightTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FlightTripRepo extends JpaRepository<FlightTrip, UUID> {
    public Optional<FlightTrip>findById(UUID id);
   @Query(value = "select * from flight_trip where arr_airport_id in (select id from airport where airport.city =?2 ) and depart_airport_id in (select id from airport where airport.city=?1) and date(arrival_time) =?3",nativeQuery = true )
    public List<FlightTrip>findByArrivalCityAndDepartureCityAndDate(String city1, String city2,String flight_date );
   @Query(value = "select * from flight_trip f where f.arr_airport_id in (select id from airport where airport.city =?2 ) and depart_airport_id in (select id from airport where airport.city=?1) and date(arrival_time) =?3 and f.id in (select trip_id from seat where availability = true group by trip_id having count(*)>=?4)",nativeQuery = true)
   public List<FlightTrip>findByArrivalCityAndDepartureCityAndDateAndSeats(String city1,String city2,String flight_date,Integer seats_required);
}
