import React from "react";
import { Card, CardContent, Typography,Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
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
  },
});
const AirplaneCard = (props) => {
  const { id, seatingCapacity, companyName, name } = props.airplane;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.header} color="textPrimary">
          {name}
        </Typography>
        <Typography className={classes.header} color="textSecondary">
          {companyName}
        </Typography>
        <Typography className={classes.info} color="textSecondary">
           {seatingCapacity}
        </Typography>
        <Button className={classes.delButton} variant="contained" onClick={() =>props.handleDeleteCard(id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};
export default AirplaneCard;