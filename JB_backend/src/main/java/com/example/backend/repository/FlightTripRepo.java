package com.example.backend.repository;

import com.example.backend.entity.FlightTrip;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface FlightTripRepo extends JpaRepository<FlightTrip, UUID> {
    public Optional<FlightTrip>findById(UUID id);
   @Transactional
   @Query(value = "select * from flight_trip f where f.arr_airport_id in (select a1.id from airport a1 where a1.city =?2 ) and depart_airport_id in (select a2.id from airport a2 where a2.city=?1) and f.depart_time BETWEEN ?3 AND ?4",nativeQuery = true )
    public List<FlightTrip>findByArrivalCityAndDepartureCityAndDate(String city1, String city2, LocalDateTime flight_date,LocalDateTime flight_date2 );
    @Transactional
    @Query(value = "select * from flight_trip f where f.arr_airport_id in (select id from airport where airport.city =?2 ) and depart_airport_id in (select id from airport where airport.city=?1) and depart_time BETWEEN ?3 AND ?4 and f.id in (select trip_id from seat where availability = true group by trip_id having count(*)>=?5)",nativeQuery = true)
   public List<FlightTrip>findByArrivalCityAndDepartureCityAndDateAndSeats(String city1,String city2,LocalDateTime flight_date,LocalDateTime flight_date2,Integer seats_required);
}
