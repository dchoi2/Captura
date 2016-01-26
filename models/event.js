var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
  date: Date,
  startTime: {type: Date},
  duration: Number,
  type: String,
  // venue = {
  //   name: String,
  //   street: String,
  //   city: String,
  //   state: String,
  //   zip: String,
  // },
  venue: String,
  status: {type: Number, default: 0}, // 0 = request, 1 =responded, 2= booked
  iodoor: Number, // 0 = indoor, 1 = outdoor, 2 = mix
  details: String,
  notes: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  photographer: {type: mongoose.Schema.Types.ObjectId, ref: 'Photographer'}
});

var eventShoot = mongoose.model('Event', eventSchema);

module.exports = {
  Event: eventShoot
}
