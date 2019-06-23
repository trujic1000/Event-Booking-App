import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '40%',
    padding: theme.spacing(3, 2),
    margin: '10px auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

const BookingItem = ({ booking, cancelBooking }) => {
  const classes = useStyles();
  const {
    event: { title },
    createdAt
  } = booking;
  return (
    <Paper elevation={2} className={classes.paper}>
      <Typography variant="body1">
        {title} - {new Date(createdAt).toLocaleDateString()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => cancelBooking(booking._id)}
      >
        Cancel
      </Button>
    </Paper>
  );
};

export default BookingItem;
