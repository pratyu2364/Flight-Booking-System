import React from 'react'
import { Grid } from '@material-ui/core';
import ShowTicketsCard from './ShowTicketsCard';

export default function ShowTicketsList({travellers}) {
    const renderTravellerList = travellers.map((traveller) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={traveller.id}>
          <ShowTicketsCard
            traveller = {traveller}
          />
          </Grid>
        );
      });
  return (
    <div>
        <Grid container spacing={3}>
            {renderTravellerList}
        </Grid>
    </div>
  )
}
