import React from 'react';
import BookingItem from './BookingItem';

const BookingList = ({ bookings, cancelBooking }) => {
  return (
    <>
      {bookings.map(booking => (
        <BookingItem
          key={booking._id}
          booking={booking}
          cancelBooking={cancelBooking}
        />
      ))}
    </>
  );
};

export default BookingList;
