const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformEvent, transformBooking } = require('./transform');

module.exports = {
  bookings: async (args, { isAuth, userId }) => {
    if (!isAuth) {
      throw new Error('Not authenticated');
    }
    try {
      const bookings = await Booking.find({ user: userId });
      return bookings.map(transformBooking);
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async ({ eventId }, { isAuth, userId }) => {
    if (!isAuth) {
      throw new Error('Not authenticated');
    }
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error('Invalid event id');
      }
      console.log(event);
      let booking = new Booking({
        event,
        user: userId
      });
      booking = await booking.save();
      return transformBooking(booking);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async ({ bookingId }, { isAuth }) => {
    if (!isAuth) {
      throw new Error('Not authenticated');
    }
    try {
      const booking = await Booking.findById(bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.findByIdAndDelete(bookingId);
      return event;
    } catch (err) {
      throw err;
    }
  }
};
