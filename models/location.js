var mongoose = require("mongoose");
//require('mongoose-type-url');
var Geocoder = require("geocoder");

var locationSchema = new mongoose.Schema(
{
  city: {type: String, required: true},
  state: {type: String, required: true},
  country: {type: String, required: true},
  loc: {
    type: [Number],
    index: '2d',
    required: true
  },
  photographers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photographer'}],
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

locationSchema.statics.findClosestPhotographers = function(query, cb) {
  return this.find({
      loc: {
        $near: [query.lng, query.lat],
        $maxDistance: query.maxDist/6371*1000
      }
    }).limit(query.maxNum)
    .populate('photographers','-password -status ').exec(cb);
}

locationSchema.virtual('cityState').get(function() {
  return this.city + ', ' + this.state
})

var location = mongoose.model('Location', locationSchema);

var geocoder = {
  geocode: (loc, cb) => {
    var locString = loc.city + ", " + loc.state + ", " + loc.country
    Geocoder.geocode(locString, function(err, data) {
      console.log("error in geocode:", err)
      if (err) {
        cb(true, {success: false, message: "Need to input a location"})
      }
      else {
        var results = data['results']
        console.log("results: ", results)
        if (results.length === 0 ||(results.length === 1 && results[0]["formatted_address"].split(",").length < 3)) {
          cb(true, {success: false, message: "Invalid location! Please enter your location in this format: <City, State>. (Note that Captura is currently only available for U.S. cities.)"})
        }
        else {
          var lat = results[0]['geometry']['location']['lat']
          var lng = results[0]['geometry']['location']['lng']
          var formattedAddress = results[0]['formatted_address']
          cb(false, {success: true, lng: lng, lat: lat, address: formattedAddress})
        }
      }
    });
  },

  reverseGeocode: (loc, cb) => {
    console.log(loc)
    Geocoder.reverseGeocode(loc.lat, loc.lng, function(err, data) {
      // var results = data.results
      console.log("error in reverseGeocode:", err)
      if (err) {
        cb(true, {success: false, message: "Need to input a location"})
      }
      else {
        var results = data['results']
        cb(false, {success: true, data: results})
      }
    })
  }
}

    // Geocoder.reverseGeocode(lat, lng, function(err, data) {
    //   response.json({data: results[0]["formatted_address"]})
    // })

module.exports = {
  Loc: location,
  Geocoder: geocoder
}

