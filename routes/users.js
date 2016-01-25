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

router.get('/account/:id', function(request, response) {
  // if (request.params.id !== request.user.id) {
  //   response.status(401).send("Not Authorized")
  // }
  User.findOne({_id:request.params.id})
  .populate('photographer event review favorites')
  .exec(function(err, user) {
    utils.handleError(err);
    User.populate(user, {
      path: 'favorites.location',
      model: 'Location'
    }, function(err, user) {
      if (err) {
        console.log(err)
        response.json({success:false, message: "error in mongodb"})
      }
      response.json({success: true, user: user});
    })
  })
})

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
      //console.log(request.body);
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

router.put('/account/:id', function(request, response) {
  User.findOne({_id: request.params.id}, function(err, user) {
    if (err) {
      response.send(err)
    }
    else if (!user) {
      response.send({success:false, message: "User with that id doesn't exist..."})
    }
    else if (user.email !== request.body.email) {
      console.log(user)
      console.log(request.body.email)
      response.send({success:false, message: "Email doesn't match database... something fishy"})
    }
    else if (user.password !== request.body.oldPassword) {
      response.send({success:false, message: "You entered the incorrect password for your account."})
    }
    else if (!request.body.password || request.body.password.length < 8) {
      response.json({success:false, message: "Password must be at least 8 characters"});
    }
    else if (request.body.password !== request.body.confirm) {
      response.send({success:false, message: "Passwords don't match"})
    }
    else {
      console.log("here! ", user)
      user.firstName = request.body.firstName;
      user.lastName = request.body.lastName;
      user.password = request.body.password;
      if (request.body.avatarBase) {
        user.avatarBase = request.body.avatarBase;
      }
      user.updated = Date.now()
      user.save(function(err, updatedUser) {
        if (err) {
          console.log("Error when saving user: ", err)
          response.send({success:false, message: "Something went wrong with MongoDB"})
        }
        else {
          response.send({success:true, user: updatedUser, message: "You've successfully updated your information."})
        }
      })
    }
  })
})

//each user will only get to edit their own favorites
router.post('/favorite', function(request, response) {
  //reques.user is always initialized in here, since checked that user is logged in
  User.findOne({id: request.user._id}, function(err, user) {
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
