import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Spinner from '../components/Spinner';
import BookingList from '../components/BookingList';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = bookingId => {
    // Request Config
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
    // Create an event
    axios
      .post('', data)
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
    // Create an event
    axios
      .post('', data)
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
