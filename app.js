/**
 * Author: George Du
 */

var express = require('express');
var path = require('path');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user').User;
require('./config/passport')(passport, User, LocalStrategy);

var mongo = require('mongodb');
var mongoose = require('mongoose');
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/popcorn';
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connection successful');
});

var pub = require('./routes/public');
//var projects = require('./routes/projects');
//var tasks = require('./routes/tasks');
var users = require('./routes/users');
var photographers = require('./routes/photographers');
var sessions = require('./routes/sessions')(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'asDni2324nasdSDSf',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/projects', tasks);
//app.use('/projects', projects);
app.use('/users', users);
app.use('/photographers', photographers);
app.use('/sessions', sessions);
app.use('/', pub);

app.use('/logout', function(request, response) {
  request.logout();
  //response.redirect("/");
  request.session.destroy(function (err) {
      response.redirect('/'); //Inside a callback… bulletproof!
  });
})

// csrf error handler
app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403);
  res.send('CSRF blocked; session has expired or form tampered with');
})

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,
  process.env.OPENSHIFT_NODEJS_IP);
