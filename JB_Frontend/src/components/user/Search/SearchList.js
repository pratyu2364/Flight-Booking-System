import React from 'react'
import SearchCard from './SearchCard';
import { useLocation } from 'react-router-dom';

export default function SearchList({flighttrips, numSeats}) {
    const renderContactList = flighttrips.map((flighttrip) => {
        return (
          <SearchCard
            flighttrip={flighttrip} 
            numSeats={numSeats}
          />
        );
      });
      return <div className="ui celled list">{renderContactList}</div>;
}
