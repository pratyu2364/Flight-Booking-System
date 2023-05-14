import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography,Button } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)',
    },
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
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

function AirportCard(props) {
  const classes = useStyles();
  const { id, name, location, city, state, country, pincode } = props.airport;
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.header} color="textPrimary">
          {name}
        </Typography>
        <Typography className={classes.info} color="textSecondary">
          {city}
        </Typography>
        <Typography className={classes.info} color="textSecondary">
          {state}, {country} {pincode}
        </Typography>
        <Button className={classes.delButton} variant="contained" onClick={() =>props.handleDeleteCard(id)}>
          Delete
        </Button>  
      </CardContent>
    </Card>
  );
}

export default AirportCard;
