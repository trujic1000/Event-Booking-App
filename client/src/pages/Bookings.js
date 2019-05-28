import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from '../context/auth-context';
import Spinner from '../components/Spinner';
import BookingList from '../components/BookingList';

const Bookings = () => {
  const {
    state: { token }
  } = useAuthState();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = bookingId => {
    // Request Config
    const url = 'http://localhost:8000/graphql';
    let data = {
      query: `
          mutation CancelBooking($id: ID!) {
            cancelBooking(bookingId: $id) {
              _id
              title
            }
          }
        `,
      variables: {
        id: bookingId
      }
    };
    // Preparing for sending a request
    data = JSON.stringify(data);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    // Create an event
    axios
      .post(url, data, config)
      .then(res => {
        const newBookings = bookings.filter(
          booking => booking._id !== bookingId
        );
        setBookings(newBookings);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchBookings = () => {
    // Request Config
    const url = 'http://localhost:8000/graphql';
    let data = {
      query: `
          query {
            bookings {
              _id
              createdAt
              event {
                _id
                title
                date
              }
            }
          }
        `
    };
    // Preparing for sending a request
    data = JSON.stringify(data);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
    // Create an event
    axios
      .post(url, data, config)
      .then(res => {
        const bookings = res.data.data.bookings;
        setBookings(bookings);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <BookingList bookings={bookings} cancelBooking={cancelBooking} />
      )}
    </>
  );
};

export default Bookings;
