var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var Photographer = require('../models/photographer').Photographer;
var utils = require('../utils');
var Event = require('../models/event').Event;

router.post('/', function(request, response) {
  var newEvent = new Event({
    user: request.body.user,
    photographer: request.body.photographer,
    date: Date(request.body.date),
    duration: request.body.duration,
    startTime: request.body.startTime,
    type: request.body.type,
    details: request.body.details,
    notes: request.body.notes,
    venue: request.body.venue
  })
  newEvent.save(function(err) {
    if (err) {
      response.send(err);
    }
    else {
      response.send({success:true})
    }
  })
})

router.get('/users/:id', function(request, response) {
  Event.find({user: request.params.id})
    .populate('photographer')
    .exec(function(err, events) {
    if (err) {
      response.send({success: false, err: err})
    }
    else {
      response.send({success: true, events: events})
    }
  })
})

/**
  GETS ALL PHOTOGRAPHERS *NEAR* THE QUERIED LOCATION
  Heavily dependent on geocoder, so if geocoder doesn't work... app won't work...
**/
router.post('/location', function(request, response) {
  var loc = {city: request.body.city, state: request.body.state, country: request.body.country}
  // TODO: create own database of locations and check before using geocode
  Geocoder.geocode(loc, function(err, data) {
    if (err) {
      response.json(data)
    }
    else {
      Loc.findClosestPhotographers(
        {lat: data.lat, lng: data.lng, maxNum: MAX_NUMB, maxDist: MAX_DIST},
        function(err, locations) {
        if (err) {
          response.json({success: false, message: "Error while saving in MongoDB"})
        }
        else {
          if (locations.length == 0) {
            response.json({success: false, message: "There are not photographers in the area, yet: " + data.address})
          }
          else {
            var pinpoint = false
            // var otherResults = false
            //check if exact query was found
            if (locations[0].loc[0] === data.lng && locations[0].loc[1] === data.lat) {
              pinpoint = true
            }

            var photographers = []
            for (var i =0; i < locations.length; i++) {
              for (var j =0; j < locations[i].photographers.length; j++) {
                var p = locations[i].photographers[j].toObject();
                p.locationString = locations[i].cityState;
                photographers.push(p)
              }
            }
            response.json({success: true, pinpoint: pinpoint, profiles: photographers, message: ''})
          }
        }
      })
    }
  })
})

router.post('/test', function(request, response) {
  var loc = {lng: request.body.lng, lat: request.body.lat}
  Geocoder.reverseGeocode(loc, function(err, data) {
    if (err) {
      response.json(data)
    }
    else {
      response.json({success: true, data: data})
    }
  })
})

module.exports = router;
