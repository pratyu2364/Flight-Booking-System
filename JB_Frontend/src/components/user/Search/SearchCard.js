import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
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
  bookNowButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    marginTop: '16px',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
});

function SearchCard(props) {
  const navigate = useNavigate();
  const clickHander = (flightData,numSeats) => {
    console.log('TripId sent from search page : ',flightData.id);
    navigate('/book', {state: {
      id : flightData.id,
      airplane : flightData.airplane, 
      departureAirport : flightData.departureAirport, 
      arrivalAirport : flightData.arrivalAirport, 
      arrivalTime : flightData.arrivalTime, 
      departTime : flightData.departTime,
      price : flightData.price,
      numSeats : numSeats
    }} );
  };
  const { id, airplane, departureAirport, arrivalAirport, arrivalTime, departTime, price } = props.flighttrip;
  
  console.log('flighttrip data: ',props.flighttrip);

  const classes = useStyles();
  const dateObj = moment.utc(arrivalTime).tz("Asia/Kolkata"); // Create a Moment.js object from the ISO string and set the timezone to IST
  const istDateString = dateObj.format("DD/MM/YYYY"); // Get the IST date component
  const istTimeString = dateObj.format("hh:mm A");
  const dateObj2 = moment.utc(departTime).tz("Asia/Kolkata"); // Create a Moment.js object from the ISO string and set the timezone to IST
  const istDateString2 = dateObj2.format("DD/MM/YYYY"); // Get the IST date component
  const istTimeString2 = dateObj2.format("hh:mm A");

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography className={classes.header} component="div">
        {departureAirport.city} - {arrivalAirport.city}
        </Typography>
        <Typography className={classes.info} variant="subtitle1" component="div">
          {airplane.name},{airplane.companyName}
        </Typography>
        <Typography className={classes.info} variant="subtitle2" component="div">
          {departureAirport.name} - {arrivalAirport.name}
        </Typography>
        <Typography className={classes.info} variant="body1" component="div">
          {istDateString2} {istTimeString2} - {istDateString} {istTimeString}
        </Typography>
        <Typography className={classes.info} variant="body2" component="div">
          Price {price}
        </Typography>
        <Button className={classes.bookNowButton} variant="contained" onClick={() => clickHander(props.flighttrip,props.numSeats)}>
          Book now
        </Button>
      </CardContent>
    </Card>
  );
}

export default SearchCard;

// import {Button} from '@material-ui/core';

// export default function SearchCard(props) {
//     const navigate = useNavigate();   
//     const clickHander = (id)=>{
//         navigate('/bookflight', { state: id});
//     }
//     const {id,airplane,departureAirport,arrivalAirport,arrivalTime,departTime} = props.flighttrip
//   return (
//     <div className="item">
//     <div className="content">
//       <div className="header">{id}</div>
//       <div>{airplane.companyName}</div>
//       <div>{departureAirport.name}</div>
//       <div>{arrivalAirport.name}</div>
//       <div>{departTime}</div>
//       <div>{arrivalTime}</div>
//       <Button variant="contained"  onClick={() => clickHander(id)}>Book now</Button>
//     </div>
//   </div>
//   )
// }
