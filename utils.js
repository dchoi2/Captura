var bcrypt = require('bcrypt');

var loggedIn = function(request, response, next) {
  if (request.user) {
    next();
  }
  else {
    response.status(401).send('Not Authorized');
  }
}

var requireRole = function(role) {
  return function(req, res, next) {
    if (req.user && req.user.role === role) next();
    else
      res.status(401).send("Not Authorized")
  }
}

var handleError = function(err) {
  if (err) {
    throw err;
  }
}

module.exports = {
  loggedIn: loggedIn,
  handleError: handleError
}
