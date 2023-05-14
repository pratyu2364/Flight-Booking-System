import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    width: '60%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(3),
  },
}));
export default function AirportForm({state,handleCreateAirport,handleInputChange}) {
  const classes = useStyles();
  // return (
  //   <div className="ui main">
  //   <h2>Add Airport</h2>
  //   <form className="ui form" onSubmit={handleCreateAirport}>
  //     <div className="field">
  //       <label>Name</label>
  //       <input
  //         type="text"
  //         name="name"
  //         placeholder="Name"
  //         value={state.name}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div className="field">
  //       <label>Location</label>
  //       <input
  //         type="text"
  //         name="location"
  //         placeholder="Location"
  //         value={state.location}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div className="field">
  //       <label>City</label>
  //       <input
  //         type="text"
  //         name="city"
  //         placeholder="City"
  //         value={state.city}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div className="field">
  //       <label>State</label>
  //       <input
  //         type="text"
  //         name="state"
  //         placeholder="State"
  //         value={state.state}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div className="field">
  //       <label>Country</label>
  //       <input
  //         type="text"
  //         name="country"
  //         placeholder="Country"
  //         value={state.country}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <div className="field">
  //       <label>Pincode</label>
  //       <input
  //         type="text"
  //         name="pincode"
  //         placeholder="Pincode"
  //         value={state.pincode}
  //         onChange={handleInputChange}
  //       />
  //     </div>
  //     <button className="ui button blue">Add</button>
  //   </form>
  // </div>
  // )
  return(
      <div className={classes.root}>
      <h2>Add Airport</h2>
      <form className={classes.form} onSubmit={handleCreateAirport}>
        <TextField
          className={classes.textField}
          label="Name"
          name="name"
          value={state.name}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          label="Location"
          name="location"
          value={state.location}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          label="City"
          name="city"
          value={state.city}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          label="State"
          name="state"
          value={state.state}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          label="Country"
          name="country"
          value={state.country}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          label="Pincode"
          name="pincode"
          value={state.pincode}
          onChange={handleInputChange}
          variant="outlined"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  )
}
