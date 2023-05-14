import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';

// setup Mobiscroll Moment plugin


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        //marginLeft: theme.spacing(10),
       //marginRight: theme.spacing(10),
    },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // marginLeft: theme.spacing(5),
    // marginRight: theme.spacing(5),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(3),
    // marginLeft: theme.spacing(20),
    // marginRight: theme.spacing(4),
  },
}));

export default function FligtTripForm({
  airports,
  airplanes,
  flighttrip,
  handleCreateFlightTrip,
  handleInputChange,
  handleInputChangeForDate,

}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>Add Flight Trips</h2>
      <form className={classes.form} onSubmit={handleCreateFlightTrip}>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Departure Airport</InputLabel>
            <Select
              name="airportDepartureId"
              value={flighttrip.airportDepartureId}
              onChange={handleInputChange}
            >
              {airports.map((airport) => (
                <MenuItem key={airport.id} value={airport.id}>
                  {airport.name}, {airport.city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Arrival Airport</InputLabel>
            <Select
              name="airportArrivalId"
              value={flighttrip.airportArrivalId}
              onChange={handleInputChange}
            >
              {airports.map((airport) => (
                <MenuItem key={airport.id} value={airport.id}>
                  {airport.name}, {airport.city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Choose Flight</InputLabel>
            <Select name="flightId" value={flighttrip.flightId} onChange={handleInputChange}>
              {airplanes.map((airplane) => (
                <MenuItem key={airplane.id} value={airplane.id}>
                  {airplane.name}, {airplane.companyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
        <FormControl className={classes.formControl}>
          <TextField
            type="number"
            label="Set Ticket Price"
            name="price"
            value={flighttrip.price}
            onChange={handleInputChange}
        />
        </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel >Departure Date and Time</InputLabel>
            <DatePicker
              selected={flighttrip.departTime}
              name="departTime"
              onChange={(date) => handleInputChangeForDate(date, 'departTime')}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel >Arrival Date and Time</InputLabel>
            <DatePicker
              selected={flighttrip.arrivalTime}
              name="arrivalTime"
              onChange={(date) => handleInputChangeForDate(date, 'arrivalTime')}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
            />
          </FormControl>
        </div>
        <Button className={classes.button} variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
    </div>)
} 
// import React, { useEffect, useState } from 'react'
// import DatePicker from "react-datepicker"; 
//  export default function FligtTripForm({airports,airplanes,flighttrip,handleCreateFlightTrip,
//     handleInputChange,
//     handleInputChangeForDate}) {

//   return (
//     <div className="ui main">
//         <h2>Add Flight Trips</h2>
//             <form className="ui form" onSubmit={handleCreateFlightTrip}>
//                 <div>
//                     <label>Select Departure Airport</label>
//                     <select name ="airportDepartureId" value ={flighttrip.airportDepartureId}
//                      className="form-select" 
//                      onChange={handleInputChange}>{
//                     airports.map((airport) => {
//                         return <option value={airport.id}>{airport.name},{airport.city}</option>
//                     })}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Select Arrival Airport</label>
//                     <select name ="airportArrivalId" value ={flighttrip.airportArrivalId}
//                      className="form-select"
//                      onChange={handleInputChange}>{
//                     airports.map((airport) => {
//                         return <option value={airport.id}>{airport.name},{airport.city}</option>
//                     })}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Choose Flight</label>
//                     <select name ="flightId" value ={flighttrip.flightId} 
//                     className="form-select"
//                     onChange={handleInputChange}>{
//                     airplanes.map((airplane) => {
//                         return <option value={airplane.id}>{airplane.name},{airplane.companyName}</option>
//                     })}
//                     </select>
//                  </div>
//                 <div >
//                     <label>Departure Date and Time</label>
//                     <DatePicker selected={flighttrip.departTime} 
//                       name ="departTime" 
//                      onChange={(date) => handleInputChangeForDate(date, 'departTime' )}
//                      showTimeSelect  
//                      timeFormat="HH:mm"
//                      timeIntervals={15}
//                      dateFormat="MMMM d, yyyy h:mm aa"
//                      timeCaption="Time"
//                      />
//                 </div>
//                 <div>
//                     <label>Arrival Date and Time</label>
//                     <DatePicker selected={flighttrip.arrivalTime} 
//                     name = "arrivalTime" 
//                     onChange={(date) => handleInputChangeForDate(date, 'arrivalTime')}
//                     showTimeSelect 
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     dateFormat="MMMM d, yyyy h:mm aa"
//                     timeCaption="Time"
//                      />
//                 </div>
//                 <button className="ui button blue">Add</button>
//             </form> 
//         </div>    
  
//   )
// }

// style={{'margin-bottom': '20px'}}