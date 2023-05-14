import React from 'react'
import AirplaneCard from './AirplaneCard';
import { Grid } from '@material-ui/core';
const AirplaneList =({airplanes,handleDeleteAirplane}) =>{
  const handleDeleteCard = (id) => {
    handleDeleteAirplane(id)
  };
    const renderAirplaneList = airplanes.map((airplane) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={airplane.id}>
          <AirplaneCard
            airplane={airplane}
            handleDeleteCard = {handleDeleteCard}
          />
          </Grid>
        );
      });
      return (
        <Grid container spacing={3}>
          {renderAirplaneList}
        </Grid>
      );
}
export default AirplaneList
