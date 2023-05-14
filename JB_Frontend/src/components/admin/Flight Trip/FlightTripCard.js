import React from 'react'
import { Card, CardContent, Typography, Button, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '16px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '10px',
    '&:hover': {
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '8px',
  },
  icon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  info: {
    marginBottom: '8px',
  },
  delButton: {
    backgroundColor: '#FF4500',
    color: 'white',
    marginTop: '16px',
    '&:hover': {
      backgroundColor: '#B22222',
    },
  }
});
export default function FlightTripCard(props) {
  const classes = useStyles();
  const options = { timeZone: 'Asia/Kolkata' };
  //  const istDate = date.toLocaleString('en-IN', options);
// Create a Date object from the ISO String

    const {id,airplane,departureAirport,arrivalAirport,arrivalTime,departTime,price} = props.flighttrip
    const dateObj = moment.utc(arrivalTime).tz("Asia/Kolkata"); // Create a Moment.js object from the ISO string and set the timezone to IST
    const istDateString = dateObj.format("DD/MM/YYYY"); // Get the IST date component
    const istTimeString = dateObj.format("hh:mm A");
    const dateObj2 = moment.utc(departTime).tz("Asia/Kolkata"); // Create a Moment.js object from the ISO string and set the timezone to IST
    const istDateString2 = dateObj2.format("DD/MM/YYYY"); // Get the IST date component
    const istTimeString2 = dateObj2.format("hh:mm A");
    // console.log("Arrival Local Date: "+`${istDateString2} ${istTimeString2}`)


  return (
    <Card className={classes.root}>
    <CardContent className={classes.content}>
      <Typography className={classes.header} component="div">
      {departureAirport.city} - {arrivalAirport.city}
      </Typography>
      <Typography className={classes.info} variant="subtitle1" component="div">
        {airplane.name}
      </Typography>
      <Typography className={classes.info} variant="subtitle2" component="div">
        {departureAirport.name} - {arrivalAirport.name}
      </Typography>
      <Typography className={classes.info} variant="body1" component="div">
      {istDateString2} {istTimeString2} - {istDateString} {istTimeString}
      </Typography>
      <Typography className={classes.info} variant="body1" component="div">
        Price {price}
      </Typography>
      <Button className={classes.delButton} variant="contained" onClick={() =>props.handleDeleteCard(id)}>
          Delete
      </Button>
    </CardContent>
  </Card>
);
}
