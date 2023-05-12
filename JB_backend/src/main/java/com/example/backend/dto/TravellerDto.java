package com.example.backend.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TravellerDto 
{
    
    private String name;

    private Integer age;

    private UUID seatId;

    private UUID exchangeSeatId;
}
