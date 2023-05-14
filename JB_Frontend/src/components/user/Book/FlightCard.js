import React from 'react';
import './FlightCard.css';

function FlightCard(props) {
  const { departureAirport, arrivalAirport, departureDate,departTime, arrivalDate,arrivalTime, airplaneInfo } = props;

  

  return (
    <div className="flight-card">
      <h2 className="card-header">FLIGHT TRIP INFORMATION</h2>
      <div className="card-details">
        <div className="detail-row">
          <span className="detail-label">Departure:</span>
          <span>{departureAirport.name},{departureAirport.city}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Arrival:</span>
          <span>{arrivalAirport.name},{arrivalAirport.city}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Departure Date:</span>
          <span>{departureDate}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Departure Time:</span>
          <span>{departTime}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Arrival Date:</span>
          <span>{arrivalDate}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Arrival Time:</span>
          <span>{arrivalTime}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Flight Name:</span>
          <span>{airplaneInfo.name},{airplaneInfo.company}</span>
        </div>
        {/* <div className="detail-row">
          <span className="detail-label">Seat Number:</span>
          <span>{seatNumber}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Passenger:</span>
          <span>{passenger}</span>
        </div> */}
      </div>
    </div>
  );
}

export default FlightCard;
