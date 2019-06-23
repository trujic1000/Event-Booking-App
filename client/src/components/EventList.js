import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events, userId }) => {
  return (
    <>
      {events.map(event => (
        <EventItem key={event._id} event={event} userId={userId} />
      ))}
    </>
  );
};

export default EventList;
