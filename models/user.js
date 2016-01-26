var mongoose = require("mongoose");

var userSchema = new mongoose.Schema( {
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photographer'}],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  avatarBase: {type: String, default: "default.png"}
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

userSchema.virtual('avatarUrl').get(function() {
  return '../../../../../img/users/avatar/' + this.avatarBase;
})

userSchema.virtual('fullName').get(function() {
  return this.firstName + " " + this.lastName
})

userSchema.virtual('firstLastInitial').get(function() {
  return this.firstName + " " + this.lastName.charAt(0)
})

var user = mongoose.model('User', userSchema);

module.exports = {
  User: user
}
