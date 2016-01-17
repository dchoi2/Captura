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
    {usernameField: 'email', passReqToCallback: true},
    function(req, email, password, done) {
      User.findOne({email: email}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!email || !(user.password === password)) {
          return done(null, false, {message: 'Invalid email/password.' });
        }
        return done(null, user)
      });
    }
  ));

}
