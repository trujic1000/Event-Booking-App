const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'event'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: true
  }
);

module.exports = Booking = mongoose.model('booking', BookingSchema);
