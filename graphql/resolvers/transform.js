const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');

// Helper function for getting events
const getEvents = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(transformEvent);
  } catch (err) {
    throw err;
  }
};

// Helper function for getting single event
const getEventById = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

// Helper function to populate creator of event
const getUserById = async userId => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User does not exist');
    }
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdEvents: getEvents.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

// Helper function for transforming event
const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: getUserById.bind(this, event._doc.creator)
  };
};

// Helper function for transforming booking
const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: getUserById.bind(this, booking._doc.user),
    event: getEventById.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

module.exports = {
  transformEvent,
  transformBooking
};
