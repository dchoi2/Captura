var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var Photographer = require('../models/photographer').Photographer;
var utils = require('../utils');
var Review = require('../models/review').Review;

router.post('/', function(request, response) {
  var newReview = new Review({
    writer: request.body.user,
    photographer: request.body.photographer,
    content: request.body.content,
    rating: request.body.rating
  })
  console.log(request.body)
  console.log(request.body.photographer)
  newReview.save(function(err, review) {
    if (err) {
      response.send(err);
    }
    else {
      Photographer.findOne({_id: request.body.photographer}, function(err, phot) {
          if (err) {
            response.send(err);
          }
          else {
            console.log(phot)
            phot.reviews.push(review._id);
            phot.save(function(err, p){
              if (err) {
                response.send({success:false, error:err})
              }
              response.send({success:true, photographer: p})
            })
          }
      })
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


module.exports = router;
