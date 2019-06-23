import React from 'react';
import axios from '../utils/axios';
import { useAuthState } from '../context/auth-context';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const EventDetailsModal = ({ open, event, handleClose }) => {
  const { _id, title, price, date, description } = event;
  const {
    state: { token }
  } = useAuthState();

  const bookEvent = () => {
    if (!token) {
      return;
    }
    // Request Config
    let data = {
      query: `
          mutation BookEvent($id: ID!){
            bookEvent(eventId: $id) {
              _id
              createdAt
              updatedAt
            }
          }
        `,
      variables: {
        id: _id
      }
    };
    // Preparing for sending a request
    data = JSON.stringify(data);
    // Book an event
    axios
      .post('', data)
      .then(res => {
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
        Event Details
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" component="h2">
          Title: {title}
        </Typography>
        <Typography variant="body1">
          Date: {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">Price: ${price}</Typography>
        <Typography variant="body1">Description: {description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={bookEvent} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsModal;
