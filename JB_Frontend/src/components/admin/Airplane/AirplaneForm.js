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
function AirplaneForm({ state, handleInputChange, handleCreateAirplane }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <h2>Add Airplane</h2>
        <form className={classes.form}onSubmit={handleCreateAirplane}>
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
          label="Company Name"
          name="companyName"
          value={state.companyName}
          onChange={handleInputChange}
          variant="outlined"
        />
          <TextField
        className={classes.textField}
        type="number"
        label="Seat Capacity"
        name="seatingCapacity"
        value={state.seatingCapacity}
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
export default AirplaneForm
