package com.example.backend.dto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TravellerListDto {
    private List<TravellerDto> travellerList;

    private UUID tripId;

    // private UUID bookingUserId;

    private String bookingUserEmailId;

}


