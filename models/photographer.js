var mongoose = require("mongoose");
//require('mongoose-type-url');
var specialtyList = ['portrait', 'headshot', 'events', 'engagement', 'wedding', 'lifestyle', 'club', 'concert', 'commercial', 'arch', 'sport', 'nature']

var photographerSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  businessName: String,
  email: {type: String, required: true},
  specialities: [String],
  links: {
    website: {type: String, required: true},
    facebook: String,
    twitter: String ,
    instagram: String,
    flickr: String
  },
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  bookings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]

});

var photographer = mongoose.model('Photographer', photographerSchema);

module.exports = {
  Photographer: photographer
}
