var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
  date: Date,
  startTime = {type: Date},
  duration = Number,
  type = String,
  venue = {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
  }
  iodoor = Number // 0 = indoor, 1 = outdoor, 2 = mix
});

var eventShoot = mongoose.model('Event', eventSchema);

module.exports = {
  Event: eventShoot
}
