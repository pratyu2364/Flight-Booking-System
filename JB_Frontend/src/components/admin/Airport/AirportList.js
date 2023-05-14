import React from 'react';
import AirportCard from './AirportCard';
import { Grid } from '@material-ui/core';

const AirportList = (props) => {
  const handleDeleteCard = (id) => {
    props.handleDeleteAirport(id)
  };
  const renderAirportList = props.airports.map((airport) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={airport.id}>
        <AirportCard airport={airport} handleDeleteCard = {handleDeleteCard}/>
      </Grid>
    );
  });

  return (
    <Grid container spacing={3}>
      {renderAirportList}
    </Grid>
  );
};

export default AirportList
// import React from 'react'
// import AirportCard from './AirportCard';

// const AirportList =(props) => {
//     const renderContactList = props.airports.map((airport) => {
//         return (
//           <AirportCard
//             airport={airport}
//           />
//         );
//       });
//       return <div className="ui celled list">{renderContactList}</div>;
// }
// export default AirportList

