var mongoose = require("mongoose");

var userSchema = new mongoose.Schema( {
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photographer'}],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

var user = mongoose.model('User', userSchema);

module.exports = {
  User: user
}
