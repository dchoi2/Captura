var express = require('express');
var User = require('../models/user').User;
var Photographer = require('../models/photographer').Photographer
var utils = require('../utils');

var Router = function(passport) {
  var router = express.Router();

  //Use passport.js to handle authentication.
  router.post('/users', function(request, response) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        utils.handleError(err);
      }
      if (!user) {
        response.json(info);
        return;
      }

      request.logIn(user, function(err) {
        if (err) {
          utils.handleError(err);
        }

        // set the message
        response.json({success: true, message: 'Login successful'});
        return;
      })
    })(request, response);

  })

  router.get('/users', utils.loggedIn, function(request, response) {
    User.findOne({_id: request.user._id}, function(err, doc) {
      utils.handleError(err);
      response.json({firstName: doc.firstName, lastName:doc.lastName, email:doc.email});
    });
  });

  //Use passport.js to handle authentication.
  router.post('/photographers', function(request, response) {
    passport.authenticate('local', function(err, user, info) {
      console.log("authentication user");
      if (err) {
        utils.handleError(err);
      }
      if (!user) {
        response.json(info);
        return;
      }

      request.logIn(user, function(err) {
        if (err) {
          utils.handleError(err);
        }

        // set the message
        response.json({success: true, message: 'Login successful'});
        return;
      })
    })(request, response);

  })

  router.get('/photographers', utils.loggedIn, function(request, response) {
    Photographer.findOne({_id: request.user._id}, function(err, doc) {
      utils.handleError(err);
      response.json({firstName: doc.firstName, lastName:doc.lastName, email:doc.email});
    });
  });

  return router;

}

module.exports = Router;
