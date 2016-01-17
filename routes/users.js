var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var Photographer = require('../models/photographer').Photographer;
var utils = require('../utils');

router.get('/', utils.loggedIn, function(request, response) {
  User.find({}, function(err, docs) {
    utils.handleError(err);
    response.json(docs);
  });
});

router.post('/', function(request, response) {
  User.findOne({email: request.body.email}, function(err, doc) {
    if (err) {
      response.send(err);
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
      var newUser = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        password: request.body.password,
        email: request.body.email,
        favorites: [],
        bookings: [],
        review: []
      });
      newUser.save(function(err) {
        if (err) {
          response.send(err);
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
    Photographer.findOne({email: request.body.email2}, function(err, photographer) {
      utils.handleError(err);
      if (!photographer) {
        response.json({
          success: false,
          message: 'No photographer with that id'
        })
        return;
      }
      User.update({email: request.body.email}, 
        {$addToSet: {favorites: photographer._id}}, 
        function(err) {
          utils.handleError(err);
          response.json({success:true});
        }
      );
    })
  });
});

router.delete('/favorite/:id', function(request, response) {
  User.findOne({email: request.body.email}, function(err, user) {
    utils.handleError(err);
    if (!user) {
      response.json({
        success: false,
        message: 'User not found'
      })
      return;
    }
    Photographer.findOne({email: request.body.email2}, function(err, photographer) {
      utils.handleError(err);
      if(!photographer) {
        response.json({
          success:false,
          message: 'No photographer with that id'
        })
        return;
      }
      User.update({email: request.body.email},
        { $pull: {favorites: photographer._id}}, function (err) {
        utils.handleError(err);
        response.json({success:true});
      });
    });
  });
});

module.exports = router;
