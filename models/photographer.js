var mongoose = require("mongoose");
//require('mongoose-type-url');
var specialtyList = ['portrait', 'headshot', 'events', 'engagement', 'wedding', 'lifestyle', 'club', 'concert', 'commercial', 'arch', 'sport', 'nature']

var photographerSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  businessName: String,
  useBusiness: {type: Boolean, default: false},
  email: {type: String, required: true},
  password: {type: String, required: true},
  specialities: [String],
  aboutMe: String,
  location: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  links: {
    portfolio: {type: String, required: true},
    facebook: String,
    twitter: String,
    instagram: String,
    flickr: String
  },
  avatarBase: {type: String, default: "default.png"},
  coverBase: {type: String, default: "default.png"},
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  bookings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  status: {type: Boolean, default: false},
  favorites: {type:Number, default: 0}
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

photographerSchema.virtual('officialName').get(function() {
  if (this.useBusiness) {
    return this.businessName;
  }
  else {
    return this.firstName + " " + this.lastName;
  }
})

photographerSchema.virtual('numReviews').get(function() {
  return this.reviews.length;
})

photographerSchema.virtual('rating').get(function() {
  var numReviews = this.reviews.length;
  var total = 0;
  for (var i = 0; i < numReviews; i++) {
    total += this.reviews.rating
  }
  if (numReviews === 0) return 0;
  return total/numReviews;
})

photographerSchema.virtual('locationString').get(function() {
  if (this.location) {
    return this.location.cityState;
  } else {
    return 'No location found'
  }
})

photographerSchema.virtual('avatarUrl').get(function() {
  return 'img/users/avatar/' + this.avatarBase;
})

photographerSchema.virtual('coverUrl').get(function() {
  return 'img/users/cover/' + this.coverBase;
})

var photographer = mongoose.model('Photographer', photographerSchema);


module.exports = {
  Photographer: photographer
}
