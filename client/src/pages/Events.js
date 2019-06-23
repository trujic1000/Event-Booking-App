import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuthState } from '../context/auth-context';
import EventList from '../components/EventList';
import Spinner from '../components/Spinner';
import CreateEventModal from '../components/CreateEventModal';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  heading: {
    width: '40%',
    padding: theme.spacing(3, 2),
    margin: '0 auto 2rem auto',
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Events = () => {
  const classes = useStyles();
  const {
    state: { token, userId }
  } = useAuthState();
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClose = () => setModalOpen(false);

  const fetchEvents = () => {
    // Request Config
    let data = {
      query: `
          query {
            events {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };
    // Preparing for sending a request
    data = JSON.stringify(data);
    // Get events
    axios
      .post('/', data)
      .then(res => {
        const { events } = res.data.data;
        setEvents(events);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <CreateEventModal
        open={modalOpen}
        handleClose={handleClose}
        events={events}
        setEvents={setEvents}
      />
      {token && (
        <Paper elevation={4} className={classes.heading}>
          <Typography variant="h5" component="h2">
            Share your own events
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setModalOpen(true)}
          >
            Create Event
          </Button>
        </Paper>
      )}
      {isLoading ? <Spinner /> : <EventList events={events} userId={userId} />}
    </>
  );
};

export default Events;
