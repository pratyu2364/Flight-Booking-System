import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import "./booking-form.css";
import { orderApi } from "../../misc/OrderApi";
import { useAuth } from "../../context/AuthContext";

function BookingForm() {
  const Mycontext = useAuth();
  const location = useLocation();

  const maxNumSeats = location.state.numSeats;

  const [passengers, setPassengers] = useState([
    { name: "", age: 0, seatId: "", exchangeSeatId: "" }
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const pricePerPassenger = 100; // Example price per passenger
    setTotalPrice(passengers.length * pricePerPassenger);
  }, [passengers]);

  useEffect(() => {
    const Auth = Mycontext;
    const user = Auth.getUser();
    const tripId = location.state.id;

    console.log(user);

    orderApi
      .getAllSeats(user, tripId)
      .then(response => {
        const seats = response.data;
        const available = [];
        const booked = [];

        seats.forEach(seat => {
          if (seat.availability) {
            available.push(seat);
          } else {
            booked.push(seat);
          }
        });

        setAvailableSeats(available);
        setBookedSeats(booked);
      })
      .catch(error => {
        console.log(error);
      });
  }, [Mycontext,location.state]);

  const handleSubmit = event => {
    event.preventDefault();

    let containsDuplicates = false;

    // check no 2 passengers have selected same seats
    passengers.forEach((passenger) => {
      const duplicateSeat = passengers.find(p => p!== passenger && (p.seatId === passenger.seatId));
      
      if(duplicateSeat){
        console.log(duplicateSeat);
        containsDuplicates = true;
      }
    });

    if(containsDuplicates){
      alert(`Select different seats/exchange seats for each passenger`)
    }
    else{
      // make a post request to backend server to book the ticket
      const Auth = Mycontext;
      const user = Auth.getUser();  
      
      const bookingDetails = {
        'travellerList' : passengers,
        'tripId' : location.state.id,
        'bookingUserEmailId': user.data.name
      }


      orderApi.bookTickets(user, bookingDetails)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    }

    console.log(passengers);
  };

  const handleAddPassenger = event => {
    event.preventDefault();
    if (passengers.length < maxNumSeats) {
      setPassengers([
        ...passengers,
        { name: "", age: 0, seatId: "", exchangeSeatId: "" }
      ]);
    } else {
      alert(`You cannot book tickets for more than ${maxNumSeats} passengers`);
    }
  };

  // 

  const handlePassengerChange = (index, field, value) => {

    console.log(index, field, value);

    const newPassengers = [...passengers];

    // store previous passenger info
    // const prevSeatId = newPassengers[index].seatId.toString();

    // console.log('Previous1 seat id: ', prevSeatId);

    //update passenger info
    newPassengers[index][field] = value;
    setPassengers(newPassengers);

    // console.log('Previous2 seat id: ', prevSeatId);
    // console.log('Updated passengers: ', passengers);



    // if (field === "seatId") {

    

      // const newSeat = availableSeats.find(
      //   seat => seat.id === value
      // );

    //   console.log(newSeat);

    //   if(Array.isArray(selectedSeats))
    //   {
    //     console.log('Yeh toh array hai');
    //   }else{
    //     console.log('Not an array');
    //   }

    //   // make the new seat as selected
    //   if (newSeat) {
    //     setSelectedSeats([...selectedSeats, newSeat]);
    //   }

    //   // remove selected seat from available seats list
    //   const updatedAvailableSeats = availableSeats.filter(
    //     seat => seat.id !== value
    //   );
    //   setAvailableSeats(updatedAvailableSeats);

      
    //   // add previously selected seat(if any) to available seats list
    //   if (prevSeatId) {

    //     const previousSeat = selectedSeats.find(
    //       seat => seat.id === prevSeatId
    //     );

    //     // make the previous seat as available
    //     if (previousSeat) {
    //       setAvailableSeats([...availableSeats, previousSeat]);
    //     }

    //     // filter out previous seat from selected seats
    //     const updatedSelectedSeats = selectedSeats.filter(
    //       seat => seat.id !== prevSeatId
    //     );
    //     setSelectedSeats(updatedSelectedSeats);

        
    //   }
    // }
    // console.log('selectedSeats : ',selectedSeats);
    // console.log('available seats: ',availableSeats);
  };

  return (
    <div>
      <header>
        <h1>Book a Flight</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          {passengers.map((passenger, index) => (
            <div key={index}>
              <h2>Passenger {index + 1}</h2>

              <label htmlFor={`name-${index}`}>Name:</label>
              <input
                type="text"
                id={`name-${index}`}
                name={`name-${index}`}
                value={passenger.name}
                onChange={event =>
                  handlePassengerChange(index, "name", event.target.value)
                }
                required
              />

              <label htmlFor={`age-${index}`}>Age:</label>
              <input
                type="number"
                id={`age-${index}`}
                name={`age-${index}`}
                value={passenger.age}
                onChange={event =>
                  handlePassengerChange(index, "age", event.target.value)
                }
                required
              />

              <label htmlFor={`seatPreference-${index}`}>Seat Preference:</label>
              <select
                id={`seatPreference-${index}`}
                name={`seatPreference-${index}`}
                // value={passenger.seatId}
                onChange={event =>
                  handlePassengerChange(index, "seatId", event.target.value)
                }
                required
              >
                {/* <option value="">--Please choose a seat--</option> */}
                {availableSeats.map(seat => (
                  <option key={`seat-${seat.seatNumber}`} value={seat.id}>
                    {seat.seatNumber}
                  </option>
                ))}
              </select>

              <label htmlFor={`exchangeSeatPreference-${index}`}>
                Exchange Seat Preference:
              </label>
              <select
                id={`exchangeSeatPreference-${index}`}
                name={`exchangeSeatPreference-${index}`}
                // value={passenger.exchangeSeatId}
                onChange={event =>
                  handlePassengerChange(
                    index,
                    "exchangeSeatId",
                    event.target.value
                  )
                }
              >
                {/* <option value="">--Please choose a seat to exchange with--</option> */}
                {bookedSeats.map(seat => (
                  <option key={`seat-${seat.seatNumber}`}
                   value={seat.id}
                   >
                    {seat.seatNumber}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="payment-container">
            <div className="payment-amount">
              Total Payment: ${totalPrice}
            </div>
 
            <button type="button" onClick={handleAddPassenger}>
              Add Passenger
            </button>

            <button type="submit">Submit</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default BookingForm;
