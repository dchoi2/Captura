var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var Photographer = require('../models/photographer').Photographer;
var utils = require('../utils');
var {Loc, Geocoder} = require('../models/location')

var MAX_NUMB = 30
var MAX_DIST = 0//kilometers
/**
  GET ALL ACCEPTED PHOTOGRAPHERS
  TODO: restrict the information that is returned
**/
router.get('/', utils.loggedIn, function(request, response) {
  Photographer.find({status: true},
    '-password -status ')
    .populate('location review')
    .exec(function(err, docs) {
      utils.handleError(err);
      console.log("Photographers: ",docs)
      response.json(docs);
    }
  );
});

/**
  GET FULL INFORMATION ON ONE PHOTOGRAPHER - for public profile page
**/
router.get('/public/:uid', utils.loggedIn, function(request, response) {
  Photographer.findOne({_id: request.params.uid, status:true},
    '-password -status')
    .populate('location review')
    .exec(function(err, doc) {
      utils.handleError(err);
      response.json({success: true, profile: doc})
    })
})
/**
  GET FULL INFORMATION ON ONE PHOTOGRAPHER - for account page
**/
router.get('/account/:uid', utils.loggedIn, function(request, response) {
  if (request.params.id !== request.user.id) {
    response.status(401).send("Not Authorized")
  }
  Photographer.findOne({_id: request.params.uid, status:true},
    '-password -status')
    .populate('location review')
    .exec(function(err, doc) {
      utils.handleError(err);
      response.json({success: true, profile: doc})
    })
})
/** GET ACCOUNT RELEVANT INFORMATION...**/
// router.get('/account', function(request, response) {

// })

/** Creates new photographer, updates Location table too**/
router.post('/', function(request, response) {

  var searchLocation = {city: request.body.city, state: request.body.state, country: request.body.country};
  Geocoder.geocode(searchLocation, function(err, geoData) {
    if (err) {
      response.json(geoData) //hacked: if error geoData contains error message
    }
    else {
      Photographer.findOne({email: request.body.email}, function(err, doc) {
        if (err) { //Need to log
          response.json({success: false, message: "Error while saving in MongoDB"});
        }
        else if (doc) {
          response.json({success:false, message: "Account with that email already exists"});
        }
        else if (!request.body.email) {
          response.json({success:false, message: "Need to specify email"});
        }
        else if (!request.body.password || request.body.password.length < 8) {
          response.json({success:false, message: "Password must be at least 8 characters"});
        }
        else {
          console.log("successfully got this far")
          var newPhotographer = new Photographer({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            businessName: request.body.businessName,
            useBusiness: request.body.useBusiness,
            password: request.body.password,
            email: request.body.email,
            specialities: request.body.specialities,
            links: {
              portfolio: request.body.portfolio,
              // facebook: request.body.facebookUrl,
              // twitter: request.body.twitterUrl,
              // instagram: request.body.instagramUrl,
              // flickr: request.body.flickrUrl
            },
            reviews: [],
            bookings: []
          })
          newPhotographer.save(function(err, photographer) {
            if (err) { //MONGODB ERROR; need to log somewhere
              console.log("Error while saving: ", err)
              response.send({success: false, message: "Error while saving in MongoDB"});
            }
            else {
              // If saved is success, add reference to Loc

              Loc.findOne({loc: [geoData.lng, geoData.lat]}, function(err, doc) {
                if (err) {
                  response.send({success: false, error:err})
                }
                else if (doc) { //Location with the specific coordinates exists already
                  console.log("location already found")

                  doc.photographers.push(photographer)
                  doc.save(function(err){
                    if (err) {
                      response.json({success: false, error: err})
                    }
                    else {
                      photographer.location = doc._id;
                      photographer.save(function(err, phot){
                        if (err) {
                          response.send({success:false, error:err})
                        }
                        response.send({success:true, photographer: phot})
                      })
                    }
                  })
                }
                else { //if location doesnt exist yet, create new location
                  // Geocoder.reverseGeocode()
                  var newLocation = new Loc({
                    city: request.body.city,
                    state: request.body.state,
                    country: request.body.country,
                    loc: [geoData.lng, geoData.lat],
                    photographer: photographer._id
                  })
                  newLocation.save(function(err, loc) {
                    if (err) {
                      response.send({success:false, error: err})
                    }
                    else {
                      photographer.location = loc._id;
                      photographer.save(function(err, phot){
                        if (err) {
                          response.send({success:false, error:err})
                        }
                        response.send({success:true, photographer: phot})
                      })
                    }
                  })
                }
              })
            }
          });
        }
      });
    }
  })
});



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
            response.json({success: true, pinpoint: pinpoint, profiles: photographers})
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
