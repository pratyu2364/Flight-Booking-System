import React, { useContext, useEffect, useState } from 'react'
import { orderApi } from '../../misc/OrderApi';
import DatePicker from "react-datepicker";
import { handleLogError } from '../../misc/Helpers';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box
} from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    // maxWidth: 1000,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //marginTop: theme.spacing(3),
    marginRight: theme.spacing(10),
    //marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10)

  },
  input: {
    //marginBottom: theme.spacing(4),
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5)
  },
  submitButton: {
    //marginTop: theme.spacing(3),
    marginLeft: theme.spacing(20)
  },
}));
export default function SearchForm({state,handleInputChange,handleInputChangeForDate,handleSearchFlightTrips}) {
    const classes = useStyles();

  return(
    <div className={classes.root}>
    <Typography variant="h4" gutterBottom>
      Search Flights
    </Typography>
    <Box boxShadow={3} p={3}>
    <form className={classes.form} onSubmit={handleSearchFlightTrips}>
      <FormControl className={classes.input}>
        <InputLabel>From</InputLabel>
        <Select
          name="deptcity"
          value={state.deptcity}
          onChange={handleInputChange}
        >
          {state.airportlist.map((airport) => (
            <MenuItem key={airport.city} value={airport.city}>
              {airport.city},{airport.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.input}>
        <InputLabel>To</InputLabel>
        <Select
          name="arrcity"
          value={state.arrcity}
          onChange={handleInputChange}
        >
          {state.airportlist.map((airport) => (
            <MenuItem key={airport.city} value={airport.city}>
            {airport.city},{airport.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.input}>
        <InputLabel>Departure Date and Time</InputLabel>
        <DatePicker
          selected={state.searchdate}
          onChange={(date) => handleInputChangeForDate(date, "searchdate")}
          dateFormat="yyyy-MM-dd"
        />
      </FormControl>
      <FormControl className={classes.input}>
      <TextField
        type="number"
        name="seat"
        label="Seating Capacity"
        value={state.seat}
        onChange={handleInputChange}
      />
      </FormControl>
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        type="submit"
      >
      Search
      </Button>
    </form>
    </Box>
  </div>
  )

}
