import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
const EventItem = ({
  event: { _id, title, price, date, creator },
  userId,
  onDetailsClick
}) => {
  return (
    <Item>
      <div>
        <h1>{title}</h1>
        <h2>
          ${price} - {new Date(date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {userId !== creator._id ? (
          <Button onClick={() => onDetailsClick(_id)}>View Details</Button>
        ) : (
          <p>You are the owner of this event</p>
        )}
      </div>
    </Item>
  );
};

const Item = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #01a7a7;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #01a7a7;
  }

  h2 {
    margin: 0.5rem 0 0 0;
    font-size: 1rem;
    color: #7c7c7c;
  }

  p {
    margin: 0;
  }
`;

export default EventItem;
