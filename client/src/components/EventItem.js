import React, { useState } from 'react';
import EventDetailsModal from './EventDetailsModal';
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

const EventItem = ({ event, userId }) => {
  const { title, date, creator } = event;
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => setModalOpen(false);
  return (
    <>
      <EventDetailsModal
        open={modalOpen}
        event={event}
        handleClose={handleClose}
      />
      <Paper elevation={2} className={classes.paper}>
        <div>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          <Typography variant="body1">
            {new Date(date).toLocaleDateString()}
          </Typography>
        </div>
        <div>
          {userId !== creator._id ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
            >
              View Details
            </Button>
          ) : (
            <Typography variant="body2">
              You are the owner of this event
            </Typography>
          )}
        </div>
      </Paper>
    </>
  );
};

export default EventItem;
