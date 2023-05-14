import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
  });
export default function ShowTicketsCard({traveller}) {
const classes = useStyles();
const {id} = traveller
console.log(traveller)
  return (
    <div>
        <Card className={classes.root}>
    <CardContent className={classes.content}>
      <Typography className={classes.header} component="div">
      {id}
      </Typography>
    </CardContent>
  </Card>
      
    </div>
  )
}
