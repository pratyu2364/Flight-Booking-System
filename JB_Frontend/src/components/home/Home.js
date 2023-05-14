import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    //#f5f5f5
    backgroundColor: '#5b92e5',
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    borderRadius: theme.spacing(1),
    backgroundColor: '#ccfff2',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  subheading: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
  },
  listItem: {
    margin: `${theme.spacing(1)}px 0`,
    paddingLeft: theme.spacing(2),
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    fontSize: theme.typography.body1.fontSize,
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.heading} gutterBottom>
              Welcome to JahazBooker!
            </Typography>
            <Typography variant="body1" gutterBottom>
              We provide hassle-free flight booking services.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.subheading} gutterBottom>
              Popular Destinations
            </Typography>
            <ul>
              <li className={classes.listItem}>New York</li>
              <li className={classes.listItem}>Los Angeles</li>
              <li className={classes.listItem}>London</li>
              <li className={classes.listItem}>Tokyo</li>
              <li className={classes.listItem}>Sydney</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.subheading} gutterBottom>
              Featured Airlines
            </Typography>
            <ul>
              <li className={classes.listItem}>Delta</li>
              <li className={classes.listItem}>United</li>
              <li className={classes.listItem}>American</li>
              <li className={classes.listItem}>British Airways</li>
              <li className={classes.listItem}>Air France</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;