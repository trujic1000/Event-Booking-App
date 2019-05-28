import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const BookingItem = ({ booking, cancelBooking }) => {
  const {
    event: { title },
    createdAt
  } = booking;
  return (
    <>
      <Item>
        <article>
          {title} - {new Date(createdAt).toLocaleDateString()}
        </article>
        <Button onClick={() => cancelBooking(booking._id)}>Cancel</Button>
      </Item>
    </>
  );
};

const Item = styled.li`
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border: 1px solid #01a7a7;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default BookingItem;
