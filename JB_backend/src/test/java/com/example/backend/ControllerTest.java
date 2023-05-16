package com.example.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.backend.controller.AdminController;
import com.example.backend.controller.UserController;
import com.example.backend.dto.TravellerDto;
import com.example.backend.dto.TravellerListDto;
import com.example.backend.entity.Airplane;
import com.example.backend.entity.Airport;
import com.example.backend.entity.Traveller;
import com.example.backend.service.AirplaneService;
import com.example.backend.service.AirportService;
import com.example.backend.service.BookingService;

@ExtendWith(MockitoExtension.class)
public class ControllerTest {

    @Mock
    private BookingService bookingService;

    @Mock
    private AirplaneService airplaneService;

    @InjectMocks
    private AdminController adminController;

    @Mock
    private AirportService airportService;

    @Test
    public void testAddAirplane(){
        UUID airplaneId = UUID.randomUUID();
        Airplane airplane = new Airplane(airplaneId,"indigo 761","Boeing",60);
        when(airplaneService.add_airplane(any(Airplane.class))).thenReturn(airplane.toString());


        // Make the API call
        ResponseEntity<?> response = adminController.add_airplane(airplane);
        
        // Verify that the airplaneService was called with the correct arguments
        verify(airplaneService).add_airplane(any(Airplane.class));
        
        // Verify the response status code and body
        // assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());

        assertEquals(response.getBody(),airplane);

    }

    @Test
    public void testAddAirport(){
        UUID airportId = UUID.randomUUID();
        Airport airport = new Airport(airportId,"IGI Airport","Delhi","NCR","Delhi","India","110021");
        when(airportService.add_airport(any(Airport.class))).thenReturn(airport.toString());


        // Make the API call
        ResponseEntity<?> response = adminController.add_airport(airport);
        
        // Verify that the airplaneService was called with the correct arguments
        verify(airportService).add_airport((any(Airport.class)));
        
        // Verify the response status code and body
        // assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        
        assertEquals(response.getBody(),airport);

    }


    // @Test
    // public void testBookTickets() {
    //     // Create a sample list of travellers
    //     // List<TravellerDto> travellers = new ArrayList<>();
    //     // Add traveller objects to the list

    //     TravellerListDto travellerListDto = new TravellerListDto();

    //     List<TravellerDto> travellerDtos = new ArrayList<>();

    //     UUID seatId1 = UUID.randomUUID();
    //     UUID seatId2 = UUID.randomUUID();

    //     travellerDtos.add(new TravellerDto("modi",45,seatId1,null));

    //     travellerDtos.add(new TravellerDto("rahul",27,seatId2,null));

        
    //     // Create a sample list of booked passengers
    //     List<Traveller> bookedPassengers = new ArrayList<>();
    //     // Add booked passenger objects to the list

    //     bookedPassengers.add(new Traveller(UUID.randomUUID(),"modi",45,));
        
    //     // Mock the behavior of the bookingService
    //     when(bookingService.book_tickets(any(TravellerListDto.class))).thenReturn(bookedPassengers);
        
    //     // Make the API call
    //     ResponseEntity<?> response = userController.book_tickets(travellerListDto);
        
    //     // Verify that the bookingService was called with the correct arguments
    //     verify(bookingService).book_tickets(any(TravellerListDto.class));
        
    //     // Verify the response status code and body
    //     assertEquals(HttpStatus.OK, response.getStatusCode());
    // }
}