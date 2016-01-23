var mongoose = require("mongoose");

var userSchema = new mongoose.Schema( {
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photographer'}],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  avatar: {type: String, default: "default"}
});

var user = mongoose.model('User', userSchema);

module.exports = {
  User: user
}
