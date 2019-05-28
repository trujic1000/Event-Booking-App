import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import Modal from '../components/Modal';

const Events = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const onCancel = () => {
    setModalOpen(false);
  };
  const onConfirm = () => {};
  return (
    <>
      {modalOpen && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={onCancel}
          onConfirm={onConfirm}
        >
          <p>Modal Content</p>
        </Modal>
      )}
      <EventsControl>
        <p>Share your own events</p>
        <Button onClick={() => setModalOpen(true)}>Create Event</Button>
      </EventsControl>
    </>
  );
};

const EventsControl = styled.div`
  text-align: center;
  border: 1px solid #01d1d1;
  padding: 1rem;
  margin: 2rem auto;
  width: 30rem;
  max-width: 80%;
`;

export default Events;
