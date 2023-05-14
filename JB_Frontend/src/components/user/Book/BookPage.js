import BookingForm from "./BookingForm";
import FlightCard from "./FlightCard";
import { useLocation } from "react-router-dom";


export default function BookPage() {
  const location = useLocation();

  const { id, airplane, departureAirport, arrivalAirport, arrivalTime, departTime, price, numSeats } = location.state;

  console.log(departTime);
  const departureDate = departTime.split('T')[0];
  const departureTime = departTime.split('T')[1];
  const arrivalDate = arrivalTime.split('T')[0];
  const arriveTime = arrivalTime.split('T')[1];

  // console.log('dep-date: ',date);
  // const {departureDate,departureTime} = departDateandTime.toLocaleDateString();  
  // const {arrivalDate,arrivalTime} = arrivalDateandTime.split('T');


  console.log(departureAirport);

  return (
    <div>
      <FlightCard
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        departureDate={departureDate}
        departTime={departureTime}
        arrivalDate={arrivalDate}
        arrivalTime={arriveTime}
        airplaneInfo={airplane}
      />

      <BookingForm />
    </div>
  )
};