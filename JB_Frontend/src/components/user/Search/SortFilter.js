import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, makeStyles, Box } from '@material-ui/core';

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
  }));
  const SortFilter = ({ options, onSortChange }) => {
    const classes = useStyles();
    const [selectedOption, setSelectedOption] = useState('');
    const handleSortChange = (event) => {
      const value = event.target.value;
      setSelectedOption(value);
      onSortChange(value);
    };
  return (
    <Box boxShadow={3} p={3}> 
    <FormControl className={classes.form}>
      <RadioGroup value={selectedOption} onChange={handleSortChange} row>
        {options.map((option) => (
          <FormControlLabel className = {classes.input}
            key={option}
            value={option}
            control={<Radio color="primary" />}
            label={option}
            labelPlacement="bottom"
            style={{ fontWeight: selectedOption === option.value ? 'bold' : 'normal' }}
          />
        ))}
      </RadioGroup>
    </FormControl>
    </Box>
  );
};

export default SortFilter;