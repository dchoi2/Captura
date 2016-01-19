var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var Photographer = require('../models/photographer').Photographer;
var utils = require('../utils');

router.get('/', utils.loggedIn, function(request, response) {
  console.log("here");
  Photographer.find({}, function(err, docs) {
    utils.handleError(err);
    console.log("Photographers: ",docs)
    response.json(docs);
  });
});

router.post('/', function(request, response) {

  Photographer.findOne({email: request.body.email}, function(err, doc) {
    if (err) {
      response.send({success: false, error: err});
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
      var newPhotographer = new Photographer({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        businessName: request.body.businessName,
        password: request.body.password,
        email: request.body.email,
        specialities: request.body.specialities,
        links: {
          website: request.body.websiteUrl,
          facebook: request.body.facebookUrl,
          twitter: request.body.twitterUrl,
          instagram: request.body.instagramUrl,
          flickr: request.body.flickrUrl
        },
        reviews: [],
        bookings: []
      })
      newPhotographer.save(function(err) {
        if (err) {
          response.send({success: false, error: err});
        }
        else {
          response.json({success: true});
        }
      });
    }
  });
});

//each user will only get to edit their own favorites
router.post('/favorite', function(request, response) {
  //reques.user is always initialized in here, since checked that user is logged in
  User.findOne({email: request.body.email}, function(err, user) {
    utils.handleError(err);
    if (!user) {
      response.json({
        success: false,
        message: 'User not found'
      })
      return;
    }
    Photographer.findOne({_id: request.body.favorite}, function(err, photographer) {
      utils.handleError(err);
      if (!photographer) {
        response.json({
          success: false,
          message: 'No photographer with that id'
        })
        return;
      }
      User.update({email: request.body.email},
        {$addToSet: {favorites: request.body.favorite}},
        function(err) {
          utils.handleError(err);
          response.json({success:true});
        }
      );
    })
  });

});

module.exports = router;
