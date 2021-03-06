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

router.post('/', (request, response) => {
  var newUser = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password,
    email: request.body.email
  });
  newUser.save( (err) => {
    // Mongoose will throw validation errors
    if (err) response.json({success:false, message: err.errors[Object.keys(err.errors)[0]].message});
    else response.json({success: true});
  })
});

router.get('/account/:id', function(request, response) {
  // if (request.params.id !== request.user.id) {
  //   response.status(401).send("Not Authorized")
  // }
  User.findOne({_id:request.params.id})
  .populate('photographer event review favorites')
  .exec(function(err, user) {
    if (err) {
      response.json({success:false})
      return
    }
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
  console.log("user: ", request.user)
  User.findOne({_id: request.user._id}, function(err, user) {
    if (err) {
      response.json({success:false})
      return;
    }
    if (!user) {
      response.json({
        success: false,
        message: 'User not found'
      })
      return;
    }
    Photographer.findById(request.body.id, function(err, photographer) {
      utils.handleError(err);
      if (!photographer) {
        response.json({
          success: false,
          message: 'No photographer with that id'
        })
        return;
      }
      console.log("photographer:", photographer)
      photographer.favorites += 1
      photographer.save(function(err, updatedPhotographer) {
        if (err) {
          response.json({success:false})
        }
        else {
          user.favorites.addToSet(photographer._id)
          user.save(function(err, userUpdated) {
              utils.handleError(err);
              console.log("user updated: ", userUpdated)
              response.json({success:true, user: userUpdated, profile: updatedPhotographer});
          });
        }
      })
    })
  });
});

router.delete('/favorite/:id', function(request, response) {
  User.findOne({_id: request.user._id}, function(err, user) {
    if (err) {
        response.json({success:false})
        return
    }
    if (!user) {
      response.json({
        success: false,
        message: 'User not found'
      })
      return;
    }
    Photographer.findById(request.params.id, function(err, photographer) {
      utils.handleError(err);
      if(!photographer) {
        response.json({
          success:false,
          message: 'No photographer with that id'
        })
        return;
      }
      photographer.favorites -= 1
      photographer.save(function(err, updatedPhotographer) {
        if (err) {
          response.json({success:false})
        }
        else {
          user.favorites.pull(photographer._id);
          user.save(function (err, user) {
            utils.handleError(err);
            response.json({success:true, user: user, profile: updatedPhotographer});
          });
        }
      })

    });
  });
});

module.exports = router;
