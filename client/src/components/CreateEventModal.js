import React, { useState } from 'react';
import axios from '../utils/axios';
import { useAuthState } from '../context/auth-context';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CreateEventModal = ({ open, handleClose, events, setEvents }) => {
  const {
    state: { userId }
  } = useAuthState();
  const [eventData, setEventData] = useState({
    title: '',
    price: 0,
    date: '',
    description: ''
  });
  const { title, price, date, description } = eventData;

  const onChange = e => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Create event method
  const createEvent = () => {
    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }
    // Request Config
    let data = {
      query: `
          mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
            createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}){
              _id
              title
              description
              date
              price
            }
          }
        `,
      variables: {
        title,
        description,
        price: +price,
        date
      }
    };
    // Preparing for sending a request
    data = JSON.stringify(data);
    // Create an event
    axios
      .post('/', data)
      .then(res => {
        const newEvent = res.data.data.createEvent;
        newEvent.creator = { _id: userId };
        setEvents([...events, newEvent]);
        handleClose();
      })
      .catch(err => console.log(err));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
        Create Event
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          type="text"
          name="title"
          label="Title"
          value={title}
          onChange={onChange}
          fullWidth
        />
        <TextField
          margin="dense"
          type="number"
          name="price"
          label="Price"
          value={price}
          onChange={onChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="datetime-local"
          type="datetime-local"
          name="date"
          label="Date and Time"
          value={date}
          onChange={onChange}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
        />
        <TextField
          margin="dense"
          type="text"
          name="description"
          label="Description"
          value={description}
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={createEvent} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventModal;
