const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./transform');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(transformEvent);
    } catch (err) {
      throw err;
    }
  },
  createEvent: async ({ eventInput }, { isAuth, userId }) => {
    // isAuth is desctructured from request
    if (!isAuth) {
      throw new Error('Not authenticated');
    }
    const { title, description, price } = eventInput;
    let event = new Event({
      title,
      description,
      price,
      creator: userId
    });
    try {
      // Save the event
      event = await event.save();
      event = transformEvent(event);
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      // Update user
      user.createdEvents.push(event);
      await user.save();
      return event;
    } catch (err) {
      throw err;
    }
  }
};
