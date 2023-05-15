import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography,Button } from "@material-ui/core";
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
  });
export default function ShowTicketsCard({traveller}) {
const classes = useStyles();
const {id,age,flightTrip,seat,name} = traveller
const {airplane,departureAirport,arrivalAirport,arrivalTime,departTime,price} = traveller.flightTrip
const dateObj = moment.utc(arrivalTime).tz("Asia/Kolkata"); // Create a Moment.js object from the ISO string and set the timezone to IST
const istDateString = dateObj.format("DD/MM/YYYY"); // Get the IST date component
const istTimeString = dateObj.format("hh:mm A");
const dateObj2 = moment.utc(departTime).tz("Asia/Kolkata"); // Create a Moment.js object from the ISO string and set the timezone to IST
const istDateString2 = dateObj2.format("DD/MM/YYYY"); // Get the IST date component
const istTimeString2 = dateObj2.format("hh:mm A");
console.log(traveller)
  return (
    <div>
        <Card className={classes.root}>
    <CardContent className={classes.content}>
      <Typography className={classes.header} component="div">
      Boarding Ticket
      </Typography>
      <Typography className={classes.info} color="body1">
           Name: {name} 
        </Typography>
        <Typography className={classes.info} color="body1">
           Age: {age} 
        </Typography>
      <Typography className={classes.info} variant="body1" component="div">
      {departureAirport.city} - {arrivalAirport.city}
      </Typography>
      <Typography className={classes.info} variant="body1" component="div">
        {departureAirport.name} - {arrivalAirport.name}
      </Typography>
      <Typography className={classes.info} variant="body1" component="div">
      {istDateString2} {istTimeString2} - {istDateString} {istTimeString}
      </Typography>
      <Typography className={classes.info} variant="body1" component="div">
        Seat Price: {seat.prices}
      </Typography>
        <Typography className={classes.info} variant="body1" component="div">
           Seat Number: {seat.seatNumber}
        </Typography>
    </CardContent>
  </Card>
      
    </div>
  )
}
