package com.example.backend.dto;

import java.util.List;
import java.util.UUID;

public class TravellerListDto {
    private List<TravellerDto> travellerList;

    private UUID trip_id;

    private UUID booking_user_id;

    public TravellerListDto() {
    }

    public TravellerListDto(List<TravellerDto> travellerList, UUID trip_id, UUID booking_user_id) {
        this.travellerList = travellerList;
        this.trip_id = trip_id;
        this.booking_user_id = booking_user_id;
    }

    public List<TravellerDto> getTravellerList() {
        return travellerList;
    }

    public void setTravellerList(List<TravellerDto> travellerList) {
        this.travellerList = travellerList;
    }

    public UUID getTrip_id() {
        return trip_id;
    }

    public void setTrip_id(UUID trip_id) {
        this.trip_id = trip_id;
    }

    public UUID getBooking_user_id() {
        return booking_user_id;
    }

    public void setBooking_user_id(UUID booking_user_id) {
        this.booking_user_id = booking_user_id;
    }

    @Override
    public String toString() {
        return "TravellerListDto{" +
                "travellerList=" + travellerList +
                ", trip_id=" + trip_id +
                ", booking_user_id=" + booking_user_id +
                '}';
    }
}


