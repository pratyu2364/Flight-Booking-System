import { makeStyles } from '@material-ui/core';
import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box
} from "@material-ui/core";
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
    marginRight: theme.spacing(5),
    //marginTop: theme.spacing(3),
    marginLeft: theme.spacing(5)

  },
  input: {
    //marginBottom: theme.spacing(4),
    marginRight: theme.spacing(20),
    marginLeft: theme.spacing(20)
  },
  submitButton: {
    //marginTop: theme.spacing(3),
    marginLeft: theme.spacing(20)
  },
}));
export default function FilterForm({priceOptions,airlinesOption,fliterFlightTrips,handleInputChangeForFilter,filter}) {
  const classes = useStyles();

  return (
    <div>
     <Box boxShadow={3} p={3}> 
    <form className={classes.form} onSubmit={fliterFlightTrips}>
      <FormControl className={classes.input}>
        <InputLabel>Price Range</InputLabel>
        <Select
          name="priceRange"
          value={filter.priceRange}
          onChange={handleInputChangeForFilter}
        >
          {priceOptions.map((timeOption) => (
            <MenuItem key={timeOption} value={timeOption}>
            {timeOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.input}>
        <InputLabel labelPlacement="start"> Airlines</InputLabel>
        <Select
          name="airlineType"
          value={filter.airlineType}
          onChange={handleInputChangeForFilter}
        >
          {airlinesOption.map((timeOption) => (
            <MenuItem key={timeOption} value={timeOption}>
            {timeOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        type="submit"
      >
      Apply
      </Button>
      </form>
     </Box> 
    </div>
  )
}
