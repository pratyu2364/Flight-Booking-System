import React from 'react'
import FlightTripCard from './FlightTripCard';

export default function FlightTripList(props) {
  const handleDeleteCard = (id) => {
    props.handleDeleteFlightTrip(id)
  };
    const renderContactList = props.flighttrips.map((flighttrip) => {
        return (
          <FlightTripCard
            flighttrip={flighttrip}
            handleDeleteCard = {handleDeleteCard}
          />
        );
      });
return <div className="ui celled list">{renderContactList}</div>;
}
