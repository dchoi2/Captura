var utils = require('../utils');

module.exports = function(passport, User, LocalStrategy) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    {usernameField: 'email', passwordField: 'password', passReqToCallback: true},
    function(req, email, password, done) {
      User.findOne({email: email}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!email || (!user)) {
          return done(null, false, {success:false, message: 'Invalid email/password.' });
        }
        user.validatePW(password, (err, isMatch) => {
          if (err) { return done(err);}
          if (!isMatch) {
            return done(null, false, {success: false, message: 'Invalid email/password.'});
          }
          else {
            return done(null, user)
          }
        })
      });
    }
  ));

}
