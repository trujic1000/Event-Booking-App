import React from 'react';
import styled from 'styled-components';
import BookingItem from './BookingItem';

const BookingList = ({ bookings, cancelBooking }) => {
  return (
    <BookingListWrapper>
      {bookings.map(booking => (
        <BookingItem
          key={booking._id}
          booking={booking}
          cancelBooking={cancelBooking}
        />
      ))}
    </BookingListWrapper>
  );
};

const BookingListWrapper = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 40rem;
  max-width: 90%;
`;

export default BookingList;
