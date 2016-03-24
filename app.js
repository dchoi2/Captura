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

app.use(express.static(path.join(__dirname, 'public')));

// MongoDB/Mongoose Connection Code
var mongo = require('mongodb');
var mongoose = require('mongoose');
var connectionString = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/popcorn';
console.log(connectionString);
console.log(process.env.MONGOLAB_URI);
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connection successful');
});


var MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: 'asDni2324nasdSDSf',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection})
}));

// Passport Session Initialization
app.use(passport.initialize());
app.use(passport.session());

//app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');


require('babel-register');
var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

// API Routing
var users = require('./routes/users');
var photographers = require('./routes/photographers');
var sessions = require('./routes/sessions')(passport);
var events = require('./routes/events');
var reviews = require('./routes/reviews')

app.use('/api/users', users);
app.use('/api/photographers', photographers);
app.use('/api/sessions', sessions);
app.use('/api/events', events);
app.use('/api/reviews', reviews);

var hist = require('history')

// app.get('/', function(req, res) {
//   res.render('index',  {
//     react: Re
//   })
// }

// React URL Routing
app.use(function(req, res) {
  var state = {state: req.user}
  console.log("req.user ", req.user)
  console.log("req.session ", req.session)
  console.log("req.url ", req.url)
  console.log("req.path", req.path)
  console.log("routes.default ", routes.default)
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      renderProps.context = "hi"
      console.log("renderProps: ", renderProps)
      var html = ReactDOM.renderToString(
                    React.createElement(
                      Router.RoutingContext,
                      renderProps));
      var page = swig.renderFile('public/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use('api/sessions/logout', function(request, response) {
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
