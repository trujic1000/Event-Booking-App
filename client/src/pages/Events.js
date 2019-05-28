import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../components/Button';
import Modal from '../components/Modal';
import { useAuthState } from '../context/auth-context';
import EventList from '../components/EventList';
import Spinner from '../components/Spinner';

const Events = () => {
  const {
    state: { token, userId }
  } = useAuthState();
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [eventData, setEventData] = useState({
    title: '',
    price: 0,
    date: '',
    description: ''
  });
  const { title, price, date, description } = eventData;

  useEffect(() => {
    fetchEvents();
  }, []);

  const onChange = e => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const onCancel = () => {
    setModalOpen(false);
    setEvent(null);
  };

  const onDetailsClick = eventId => {
    const event = events.find(e => e._id === eventId);
    setEvent(event);
  };

  const bookEvent = () => {
    if (!token) {
      setEvent(null);
      return;
    }
    // Request Config
    const url = 'http://localhost:8000/graphql';
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
        id: event._id
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
    // Book an event
    axios
      .post(url, data, config)
      .then(res => {
        setEvent(null);
      })
      .catch(err => console.log(err));
  };

  const createEvent = () => {
    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }
    // Request Config
    const url = 'http://localhost:8000/graphql';
    let data = {
      query: `
          mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
            createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}){
              _id
              title
              description
              date
              price
            }
          }
        `,
      variables: {
        title,
        description,
        price: +price,
        date
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
        const newEvent = res.data.data.createEvent;
        newEvent.creator = { _id: userId };
        setEvents([...events, newEvent]);
        setModalOpen(false);
      })
      .catch(err => console.log(err));
  };

  const fetchEvents = () => {
    // Request Config
    const url = 'http://localhost:8000/graphql';
    let data = {
      query: `
          query {
            events {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
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
    // Get events
    axios
      .post(url, data, config)
      .then(res => {
        const events = res.data.data.events;
        setEvents(events);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      {modalOpen && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={onCancel}
          onConfirm={createEvent}
          confirmText="Confirm"
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={onChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={date}
                onChange={onChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={description}
                onChange={onChange}
              />
            </div>
          </form>
        </Modal>
      )}
      {event && (
        <Modal
          title={event.title}
          canCancel
          canConfirm
          onCancel={onCancel}
          onConfirm={bookEvent}
          confirmText={token ? 'Book' : 'Confirm'}
        >
          <h1>{event.title}</h1>
          <h2>
            ${event.price} - {new Date(event.date).toLocaleDateString()}
          </h2>
          <p>{event.description}</p>
        </Modal>
      )}
      {token && (
        <EventsControl>
          <p>Share your own events</p>
          <Button onClick={() => setModalOpen(true)}>Create Event</Button>
        </EventsControl>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          userId={userId}
          onDetailsClick={onDetailsClick}
        />
      )}
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
