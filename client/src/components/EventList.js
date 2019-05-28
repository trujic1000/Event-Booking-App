import React from 'react';
import styled from 'styled-components';
import EventItem from './EventItem';

const EventList = ({ events, userId, onDetailsClick }) => {
  return (
    <EventsListWrapper>
      {events.map(event => (
        <EventItem
          key={event._id}
          event={event}
          userId={userId}
          onDetailsClick={onDetailsClick}
        />
      ))}
    </EventsListWrapper>
  );
};

const EventsListWrapper = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`;

export default EventList;
