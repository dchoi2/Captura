(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appDispatcher = require('../dispatchers/appDispatcher.js');

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _exploreConstants = require('../constants/exploreConstants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExploreActions = function () {
  function ExploreActions() {
    _classCallCheck(this, ExploreActions);
  }

  _createClass(ExploreActions, null, [{
    key: 'getPhotographers',
    value: function getPhotographers(number) {
      $.ajax({ type: 'GET', url: '/api/photographers' }).done(function (userData) {
        _appDispatcher2.default.handleViewAction({
          actionType: _exploreConstants.UPDATE_PHOTOS,
          profiles: userData
        });
        //localStorage.setItem('user', userData.email)
      });
    }
  }, {
    key: 'searchLocation',
    value: function searchLocation(location) {
      console.log("Logging in...");
      console.log(UNAUTHORIZED);
      return $.ajax({ type: 'POST', url: '/api/sessions', data: loginData }).done(function (data) {
        if (!data.success) {
          console.log("failure...");
          console.log(UNAUTHORIZED);
          _appDispatcher2.default.handleViewAction({
            actionType: UNAUTHORIZED,
            message: data.message
          });
        } else {
          console.log("validCredentials!");
          SessionActions.getUserInfo();
        }
      });
    }
  }]);

  return ExploreActions;
}();

exports.default = ExploreActions;

},{"../constants/exploreConstants.js":16,"../dispatchers/appDispatcher.js":19}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appDispatcher = require('../dispatchers/appDispatcher.js');

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _photographerConstants = require('../constants/photographerConstants.js');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import RouterContainer from '../services/RouterContainer'

var PhotographerActions = function () {
  function PhotographerActions() {
    _classCallCheck(this, PhotographerActions);
  }

  _createClass(PhotographerActions, null, [{
    key: 'getPhotographerInfo',
    value: function getPhotographerInfo(id) {
      $.ajax({ type: 'GET', url: '/api/photographer/' + id }).done(function (userData) {
        _appDispatcher2.default.handleViewAction({
          actionType: _photographerConstants.GET_PHOTOGRAPHER,
          data: userData
        });
      });
    }
  }]);

  return PhotographerActions;
}();

exports.default = PhotographerActions;

},{"../constants/photographerConstants.js":17,"../dispatchers/appDispatcher.js":19,"react-router":"react-router"}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appDispatcher = require('../dispatchers/appDispatcher.js');

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _sessionConstants = require('../constants/sessionConstants.js');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import RouterContainer from '../services/RouterContainer'

var SessionActions = function () {
  function SessionActions() {
    _classCallCheck(this, SessionActions);
  }

  _createClass(SessionActions, null, [{
    key: 'getUserInfo',
    value: function getUserInfo() {
      $.ajax({ type: 'GET', url: '/api/sessions/users' }).done(function (userData) {
        _appDispatcher2.default.handleViewAction({
          actionType: _sessionConstants.LOGIN_USER,
          data: userData
        });
        //localStorage.setItem('user', userData.email)
      });
    }
  }, {
    key: 'userLogin',
    value: function userLogin(loginData, cb) {
      $.ajax({ type: 'POST', url: '/api/sessions/users', data: loginData }).done(function (data) {
        if (!data.success) {
          console.log("login failed...");
          if (cb) cb(data);
        } else {
          console.log("validCredentials!");
          SessionActions.getUserInfo();
        }
      });
    }
  }, {
    key: 'signup',
    value: function signup(signupData, cb) {
      $.ajax({ type: 'POST', url: '/api/users', data: signupData }).done(function (data) {
        if (!data.success) {
          if (cb) cb(data);
        } else {
          SessionActions.userLogin(signupData);
        }
      });
    }
  }, {
    key: 'getPhotographerInfo',
    value: function getPhotographerInfo() {
      $.ajax({ type: 'GET', url: '/api/sessions/photographer' }).done(function (userData) {
        _appDispatcher2.default.handleViewAction({
          actionType: LOGIN_PHOTOGRAPHER,
          data: userData
        });
      });
    }
  }, {
    key: 'photographerLogin',
    value: function photographerLogin(applyData, cb) {
      $.ajax({ type: 'POST', url: '/api/sessions/photographers', data: applyData }).done(function (data) {
        if (!data.success) {
          console.log("login failed...");
          if (cb) cb(data);
        } else {
          console.log("validCredentials!");
          SessionActions.getPhotographerInfo();
        }
      });
    }
  }, {
    key: 'applyFor',
    value: function applyFor(applyData, cb) {
      console.log("applyData", applyData);
      console.log(cb);
      $.ajax({ type: 'POST', url: '/api/photographers', data: applyData }).done(function (data) {
        console.log("sent Post");
        if (!data.success) {
          if (cb) cb(data);
        } else {
          SessionActions.photographerLogin(applyData);
        }
      }).fail(function (data) {
        console.log("error happend", data);
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      _reactRouter.browserHistory.push('/');
      localStorage.removeItem('user');
      _appDispatcher2.default.handleViewAction({
        actionType: _sessionConstants.LOGOUT_USER
      });
    }
  }]);

  return SessionActions;
}();

exports.default = SessionActions;

},{"../constants/sessionConstants.js":18,"../dispatchers/appDispatcher.js":19,"react-router":"react-router"}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _navbar = require('./navbar/navbar.js');

var _navbar2 = _interopRequireDefault(_navbar);

var _sessionStore = require('../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

    _this.state = _this._getLoginState();
    return _this;
  }

  _createClass(App, [{
    key: '_getLoginState',
    value: function _getLoginState() {
      return {
        userLoggedIn: _sessionStore2.default.isLoggedIn()
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      _sessionStore2.default.addChangeListener(this.changeListener);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(this._getLoginState());
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_navbar2.default, { history: this.props.history }),
        this.props.children
      );
    }
  }]);

  return App;
}(_react2.default.Component);

;

exports.default = App;

},{"../stores/sessionStore":25,"./navbar/navbar.js":8,"react":"react"}],5:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sessionStore = require('../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (ComposedComponent) {
  return function (_React$Component) {
    _inherits(AuthenticatedComponent, _React$Component);

    function AuthenticatedComponent() {
      _classCallCheck(this, AuthenticatedComponent);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AuthenticatedComponent).call(this));

      _this.state = _this._getLoginState();
      return _this;
    }

    _createClass(AuthenticatedComponent, [{
      key: '_getLoginState',
      value: function _getLoginState() {
        return {
          userLoggedIn: _sessionStore2.default.isLoggedIn(),
          firstName: _sessionStore2.default.firstName,
          lastName: _sessionStore2.default.lastName,
          email: _sessionStore2.default.email
        };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        _sessionStore2.default.addChangeListener(this.changeListener);
      }
    }, {
      key: '_onChange',
      value: function _onChange() {
        this.setState(this._getLoginState());
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _sessionStore2.default.removeChangeListener(this.changeListener);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ComposedComponent, _extends({}, this.props, {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          userLoggedIn: this.state.userLoggedIn }));
      }
    }]);

    return AuthenticatedComponent;
  }(_react2.default.Component);
};

},{"../stores/sessionStore":25,"react":"react"}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _authenticatedComponent = require('./authenticatedComponent');

var _authenticatedComponent2 = _interopRequireDefault(_authenticatedComponent);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'callout large hero' },
          _react2.default.createElement(
            'h1',
            null,
            _react2.default.createElement(
              'em',
              null,
              'Live'
            ),
            ' in the moment.'
          ),
          _react2.default.createElement(
            'h3',
            null,
            'Leave the capturing to us.'
          ),
          _react2.default.createElement(
            'button',
            { className: 'primary button' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: this.props.userLoggedIn ? '/home' : '/signup' },
              'Get Started'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'how', className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'large-4 columns' },
            _react2.default.createElement(
              'span',
              { className: 'circle' },
              '1'
            ),
            _react2.default.createElement(
              'h2',
              null,
              'Tell us your needs.'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Specify when and where you want your moments captured, so you can enjoy the moment worry-free.'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'large-4 columns' },
            _react2.default.createElement(
              'span',
              { className: 'circle' },
              '2'
            ),
            _react2.default.createElement(
              'h2',
              null,
              'Browse photographers.'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Explore photographers in your area by ratings, specialties, and styles. Choose ones that best reflect your personality - it',
              '\'',
              's your pick! '
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'large-4 columns' },
            _react2.default.createElement(
              'span',
              { className: 'circle' },
              '3'
            ),
            _react2.default.createElement(
              'h2',
              null,
              'Request a quote.'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Easily send a request to your favorite photographers for a quote with your event details. That',
              '\'',
              's it!'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'callout medium photographer' },
          _react2.default.createElement(
            'h2',
            null,
            'Are you a photographer?'
          ),
          _react2.default.createElement(
            'button',
            { className: 'hollow button' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/apply' },
              'Apply Now'
            )
          )
        )
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = (0, _authenticatedComponent2.default)(Home);

},{"./authenticatedComponent":5,"react":"react","react-router":"react-router"}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sessionActions = require('../../actions/sessionActions');

var _sessionActions2 = _interopRequireDefault(_sessionActions);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this));

    _this.state = _this.getInputState();
    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
    _this.handlePwdChange = _this.handlePwdChange.bind(_this);
    _this.login = _this.login.bind(_this);
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(this.getInputState());
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
    }
  }, {
    key: 'getInputState',
    value: function getInputState() {
      return {
        email: this._email,
        password: this._password,
        message: this._message
      };
    }
  }, {
    key: 'handleEmailChange',
    value: function handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
  }, {
    key: 'handlePwdChange',
    value: function handlePwdChange(e) {
      this.setState({ password: e.target.value });
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'login',
    value: function login(e) {
      e.preventDefault();
      var loginData = {
        email: this.state.email,
        password: this.state.password
      };

      var that = this;
      _sessionActions2.default.userLogin(loginData, function (data) {
        that.setState({ email: '', password: '', message: data.message });
        _reactDom2.default.findDOMNode(that.refs.focus).focus();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'login jumbotron center-block' },
        _react2.default.createElement(
          'h1',
          null,
          'Login'
        ),
        _react2.default.createElement(
          'h2',
          null,
          this.state.message
        ),
        _react2.default.createElement(
          'form',
          { id: 'signup-form', name: 'signup-form', role: 'form', onSubmit: this.login },
          _react2.default.createElement('input', { type: 'text', ref: 'focus', onChange: this.handleEmailChange, value: this.state.email, name: 'email', id: 'email', placeholder: 'Email Address' }),
          _react2.default.createElement('input', { type: 'password', onChange: this.handlePwdChange, value: this.state.password, name: 'password', id: 'password', ref: 'password', placeholder: 'Password' }),
          _react2.default.createElement('input', { type: 'submit', value: 'Log In', className: 'expanded button' })
        ),
        _react2.default.createElement(
          'p',
          null,
          'Don\'t have an account yet?',
          ' ',
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/signup' },
            'Sign Up'
          )
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = Login;

},{"../../actions/sessionActions":3,"react":"react","react-dom":"react-dom","react-router":"react-router"}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _sessionStore = require('../../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

var _sessionActions = require('../../actions/sessionActions');

var _sessionActions2 = _interopRequireDefault(_sessionActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import NavbarActions from '../actions/navbarActions';

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).call(this));

    _this.state = _sessionStore2.default.getState();
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(Navbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _sessionStore2.default.addChangeListener(this._onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _sessionStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange(state) {
      this.setState(_sessionStore2.default.getState());
    }
  }, {
    key: 'logout',
    value: function logout(e) {
      e.preventDefault();
      _sessionActions2.default.logout();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'top-bar', id: 'main-menu' },
        _react2.default.createElement(
          'div',
          { className: 'top-bar-left' },
          _react2.default.createElement(
            'ul',
            { className: 'menu' },
            _react2.default.createElement(
              'li',
              { className: 'menu-text' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' },
                'Captura'
              )
            )
          )
        ),
        this.headerItems
      );
    }
  }, {
    key: 'headerItems',
    get: function get() {
      if (!this.state.isLoggedIn) {
        return _react2.default.createElement(
          'div',
          { className: 'top-bar-right' },
          _react2.default.createElement(
            'ul',
            { className: 'menu align-right' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/login', 'data-open': 'login-modal' },
                ' ',
                _react2.default.createElement('i', { className: 'fi-lock' }),
                ' Log In'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/signup', 'data-open': 'signup-modal' },
                'Sign Up'
              )
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'top-bar-right' },
          _react2.default.createElement(
            'ul',
            { className: 'menu align-right' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: '', onClick: this.logout },
                'Logout'
              )
            )
          )
        );
      }
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;

},{"../../actions/sessionActions":3,"../../stores/sessionStore":25,"react":"react","react-router":"react-router"}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sessionActions = require('../../actions/sessionActions');

var _sessionActions2 = _interopRequireDefault(_sessionActions);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup() {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signup).call(this));

    _this.state = _this.resetState();
    _this.signup = _this.signup.bind(_this);
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(Signup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _reactDom2.default.findDOMNode(this.refs.firstName).focus();
    }
  }, {
    key: 'resetState',
    value: function resetState() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        message: ''
      };
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(this.resetState());
      _reactDom2.default.findDOMNode(this.refs.firstName).focus();
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'signup',
    value: function signup(e) {
      e.preventDefault();
      console.log(this.refs.email.value, this.refs.password.value);
      if (this.refs.password.value !== this.refs.confirm.value) {
        this.setState({ message: "Passwords don't match" });
      } else {
        var signupData = {
          firstName: this.refs.firstName.value,
          lastName: this.refs.lastName.value,
          email: this.refs.email.value,
          password: this.refs.password.value
        };
        var that = this;

        _sessionActions2.default.signup(signupData, function (data) {
          that.setState({ message: data.message });
          _reactDom2.default.findDOMNode(that.refs.firstName).focus();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'login jumbotron center-block' },
        _react2.default.createElement(
          'h1',
          null,
          'Sign Up'
        ),
        _react2.default.createElement(
          'h2',
          null,
          this.state.message
        ),
        _react2.default.createElement(
          'form',
          { role: 'form', onSubmit: this.signup },
          _react2.default.createElement('input', { type: 'text', ref: 'firstName', className: 'form-control', name: 'firstname', id: 'firstname', placeholder: 'First name' }),
          _react2.default.createElement('input', { type: 'text', ref: 'lastName', className: 'form-control', name: 'lastname', id: 'lastname', placeholder: 'Last name' }),
          _react2.default.createElement('input', { type: 'text', ref: 'email', className: 'form-control', name: 'email', id: 'email', placeholder: 'Email' }),
          _react2.default.createElement('input', { type: 'password', ref: 'password', className: 'form-control', id: 'password', placeholder: 'Password' }),
          _react2.default.createElement('input', { type: 'password', ref: 'confirm', className: 'form-control', id: 'password', placeholder: 'Confirm password' }),
          _react2.default.createElement('input', { type: 'submit', value: 'Sign Up', className: 'expanded button' })
        ),
        _react2.default.createElement(
          'p',
          null,
          'Already have an account?',
          ' ',
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/login' },
            'Log in'
          )
        )
      );
    }
  }]);

  return Signup;
}(_react2.default.Component);

exports.default = Signup;

},{"../../actions/sessionActions":3,"react":"react","react-dom":"react-dom","react-router":"react-router"}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sessionActions = require('../../actions/sessionActions');

var _sessionActions2 = _interopRequireDefault(_sessionActions);

var _reactRouter = require('react-router');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Apply = function (_React$Component) {
  _inherits(Apply, _React$Component);

  function Apply() {
    _classCallCheck(this, Apply);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Apply).call(this));

    _this.state = {
      avatar: null,
      coverPhoto: null,
      files: []
    };
    _this.signup = _this.signup.bind(_this);
    _this.onOpenClick = _this.onOpenClick.bind(_this);
    _this.onDrop = _this.onDrop.bind(_this);
    _this.test = _this.test.bind(_this);
    //this._onChange = this._onChange.bind(this);
    return _this;
  }

  _createClass(Apply, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _reactDom2.default.findDOMNode(this.refs.firstName).focus();
    }
  }, {
    key: 'onDrop',
    value: function onDrop(files) {
      console.log(files);
      if (files[0].type !== 'image/jpeg') {
        console.log("file is not jpg");
      }
      this.setState({
        files: files
      });
    }
  }, {
    key: 'onOpenClick',
    value: function onOpenClick() {
      this.refs.dropzone.open();
    }
  }, {
    key: 'test',
    value: function test() {
      console.log(this.refs.sP);
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'signup',
    value: function signup(e) {
      e.preventDefault();
      if (this.state.password !== this.state.confirm) {
        this.setState({ message: "Passwords don't match" });
      } else {
        console.log(this.refs.sP.value);
        console.log(this.refs.sH.value);
        var applyData = {
          firstName: this.refs.firstName.value,
          lastName: this.refs.lastName.value,
          businessName: this.refs.businessName.value,
          email: this.refs.email.value,
          password: this.refs.password.value
        };
        var that = this;
        _sessionActions2.default.applyFor(applyData, function (data) {
          that.setState({ message: data.message });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'login jumbotron center-block' },
        _react2.default.createElement(
          'h1',
          null,
          'Apply to be a Photographer!'
        ),
        _react2.default.createElement(
          'h2',
          null,
          this.state.message
        ),
        _react2.default.createElement(
          'form',
          { role: 'form', onSubmit: this.signup },
          _react2.default.createElement('input', { type: 'text', ref: 'firstName', className: 'form-control', name: 'firstname', id: 'firstname', placeholder: 'First name' }),
          _react2.default.createElement('input', { type: 'text', ref: 'lastName', className: 'form-control', name: 'lastname', id: 'lastname', placeholder: 'Last name' }),
          _react2.default.createElement('input', { type: 'text', ref: 'businessName', className: 'form-control', name: 'businessName', id: 'businessName', placeholder: 'Business name' }),
          _react2.default.createElement('input', { type: 'text', ref: 'email', className: 'form-control', name: 'email', id: 'email', placeholder: 'Email' }),
          _react2.default.createElement('input', { type: 'password', className: 'form-control', id: 'password', ref: 'password', placeholder: 'Password' }),
          _react2.default.createElement('input', { type: 'password', className: 'form-control', id: 'confirm', ref: 'confirm', placeholder: 'Confirm password' }),
          _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'website', ref: 'website', placeholder: 'Portfolio Link' }),
          _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'facebook', ref: 'facebook', placeholder: 'Facebook Page' }),
          _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'twitter', ref: 'twitter', placeholder: 'Twitter Page' }),
          _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'instagram', ref: 'instagram', placeholder: 'Instagram Page' }),
          _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'flickr', ref: 'flickr', placeholder: 'Flickr Page' }),
          _react2.default.createElement(
            'fieldset',
            { className: 'fieldset' },
            _react2.default.createElement(
              'legend',
              null,
              'Specialties:'
            ),
            _react2.default.createElement(
              'div',
              { className: 'large-3 columns' },
              _react2.default.createElement('input', { id: 'portrait', type: 'checkbox', onClick: this.test, ref: 'sP' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'portrait' },
                'Portrait'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'headshot', type: 'checkbox', ref: 'sH' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'headshot' },
                'Headshot'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'events', type: 'checkbox', ref: 'sEv' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'events' },
                'Events'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'large-3 columns' },
              _react2.default.createElement('input', { id: 'engagement', type: 'checkbox', ref: 'sEn' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'engagement' },
                'Engagement'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'wedding', type: 'checkbox', ref: 'sW' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'wedding' },
                'Wedding'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'lifestyle', type: 'checkbox', ref: 'sL' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'lifestyle' },
                'Lifestyle/Candid'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'large-3 columns' },
              _react2.default.createElement('input', { id: 'club', type: 'checkbox', ref: 'sCl' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'club' },
                'Club/Nightlife'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'concert', type: 'checkbox', ref: 'sCon' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'concert' },
                'Concert/Performance'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'commercial', type: 'checkbox', ref: 'sCom' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'commercial' },
                'Commercial'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'large-3 columns' },
              _react2.default.createElement('input', { id: 'arch', type: 'checkbox', ref: 'sA' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'arch' },
                'Real Estate/Architecture'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'sports', type: 'checkbox', ref: 'sSp' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'sports' },
                'Sports'
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'nature', type: 'checkbox', ref: 'sN' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'nature' },
                'Nature'
              )
            )
          ),
          _react2.default.createElement(
            _reactDropzone2.default,
            { ref: 'dropzone', onDrop: this.onDrop },
            _react2.default.createElement(
              'div',
              null,
              'Try dropping some files here, or click to select files to upload.'
            )
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', onClick: this.onOpenClick },
            'Open Dropzone'
          ),
          this.state.files.length > 0 ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h2',
              null,
              'Uploading ',
              this.state.files.length,
              ' files...'
            ),
            _react2.default.createElement(
              'div',
              null,
              this.state.files.map(function (file) {
                return _react2.default.createElement('img', { src: file.preview });
              })
            )
          ) : null,
          _react2.default.createElement('input', { type: 'submit', value: 'Sign Up', className: 'expanded button' })
        )
      );
    }
  }]);

  return Apply;
}(_react2.default.Component);

exports.default = Apply;

// <form role="form" onSubmit={this.signup}>
//   <input type="text" ref="firstName" className="form-control" name="firstname" id="firstname" placeholder="First name" />
//   <input type="text" ref="lastName" className="form-control" name="lastname" id="lastname" placeholder="Last name" />
//   <input type="text" className="form-control" name="businessName" id="businessName" placeholder="Business name" />
//   <input type="text"  ref = "email" className="form-control" name="email" id="email"  placeholder="Email" />
//   <input type="password" className="form-control" id="password" ref="password" placeholder="Password" />
//   <input type="password"  className="form-control" id="confirm" ref="confirm" placeholder="Confirm password" />
//   <input type="text"  className="form-control" id="website" ref="website" placeholder="Portfolio Link" />
//   <input type="text" className="form-control" id="facebook" ref="facebook" placeholder="Facebook Page"/>
//   <input type="text" className="form-control" id="twitter" ref="twitter" placeholder="Twitter Page"/>
//   <input type="text" className="form-control" id="instagram" ref="instagram" placeholder="Instagram Page"/>
//   <input type="text" className="form-control" id="flickr" ref="flickr" placeholder="Flickr Page"/>
//   <fieldset className="fieldset">
//     <legend>Specialties:</legend>
//     <div className="large-3 columns">
//       <input id="portrait" type="checkbox" ref="sP"/><label htmlFor="portrait">Portrait</label><br/>
//       <input id="headshot" type="checkbox" ref="sH"/><label htmlFor="headshot">Headshot</label><br/>
//       <input id="events" type="checkbox"  ref="sEv"/><label htmlFor="events">Events</label>
//     </div>
//     <div className="large-3 columns">
//       <input id="engagement" type="checkbox" ref="sEn"/><label htmlFor="engagement">Engagement</label><br/>
//       <input id="wedding" type="checkbox" ref="sW"/><label htmlFor="wedding">Wedding</label><br/>
//       <input id="lifestyle" type="checkbox" ref="sL"/><label htmlFor="lifestyle">Lifestyle/Candid</label>
//     </div>
//     <div className="large-3 columns">
//       <input id="club" type="checkbox" ref="sCl"/><label htmlFor="club">Club/Nightlife</label><br/>
//       <input id="concert" type="checkbox" ref="sCon"/><label htmlFor="concert">Concert/Performance</label><br/>
//       <input id="commercial" type="checkbox" ref="sCom"/><label htmlFor="commercial">Commercial</label>
//     </div>
//     <div className="large-3 columns">
//       <input id="arch" type="checkbox" ref="sA"/><label htmlFor="arch">Real Estate/Architecture</label><br/>
//       <input id="sports" type="checkbox" ref="sSp"/><label htmlFor="sports">Sports</label><br/>
//       <input id="nature" type="checkbox" ref="sN"/><label htmlFor="nature">Nature</label>
//     </div>
//   </fieldset>
//   <Dropzone ref="dropzone" onDrop={this.onDrop}>
//       <div>Try dropping some files here, or click to select files to upload.</div>
//   </Dropzone>
//   <button type="button" onClick={this.onOpenClick}>
//       Open Dropzone
//   </button>
//   {this.state.files.length > 0 ? <div>
//   <h2>Uploading {this.state.files.length} files...</h2>
//   <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
//   </div> : null}
//   <input type="submit" value="Sign Up" className="expanded button"/>
// // </form>

},{"../../actions/sessionActions":3,"react":"react","react-dom":"react-dom","react-dropzone":33,"react-router":"react-router"}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _photographerActions = require('../../actions/photographerActions');

var _photographerActions2 = _interopRequireDefault(_photographerActions);

var _photographerStore = require('../../stores/photographerStore');

var _photographerStore2 = _interopRequireDefault(_photographerStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotographerProfileHeader = function (_React$Component) {
  _inherits(PhotographerProfileHeader, _React$Component);

  function PhotographerProfileHeader() {
    _classCallCheck(this, PhotographerProfileHeader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PhotographerProfileHeader).apply(this, arguments));
  }

  _createClass(PhotographerProfileHeader, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container cover' },
        _react2.default.createElement('img', { src: 'img/users/cover/001.jpg' })
      );
    }
  }]);

  return PhotographerProfileHeader;
}(_react2.default.Component);

var PhotographerProfile = function (_React$Component2) {
  _inherits(PhotographerProfile, _React$Component2);

  function PhotographerProfile() {
    _classCallCheck(this, PhotographerProfile);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PhotographerProfile).call(this));

    _this2.state = _photographerStore2.default.getState();
    return _this2;
  }

  _createClass(PhotographerProfile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _photographerStore2.default.addChangeListener(this._onChange);
      var id = this.props.params.id;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _photographerStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.state = _photographerStore2.default.getState();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'h1',
          null,
          'Login'
        ),
        _react2.default.createElement(
          'h2',
          null,
          this.state.message
        ),
        _react2.default.createElement(
          'form',
          { id: 'signup-form', name: 'signup-form', role: 'form', onSubmit: this.login },
          _react2.default.createElement('input', { type: 'text', ref: 'focus', onChange: this.handleEmailChange, value: this.state.email, name: 'email', id: 'email', placeholder: 'Email Address' }),
          _react2.default.createElement('input', { type: 'password', onChange: this.handlePwdChange, value: this.state.password, name: 'password', id: 'password', ref: 'password', placeholder: 'Password' }),
          _react2.default.createElement('input', { type: 'submit', value: 'Log In', className: 'expanded button' })
        )
      );
    }
  }]);

  return PhotographerProfile;
}(_react2.default.Component);

exports.default = PhotographerProfile;

},{"../../actions/photographerActions":2,"../../stores/photographerStore":24,"react":"react","react-dom":"react-dom"}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _authenticatedComponent = require('../authenticatedComponent');

var _authenticatedComponent2 = _interopRequireDefault(_authenticatedComponent);

var _reactRouter = require('react-router');

var _exploreHeader = require('./exploreHeader');

var _exploreHeader2 = _interopRequireDefault(_exploreHeader);

var _exploreStore = require('../../stores/exploreStore');

var _exploreStore2 = _interopRequireDefault(_exploreStore);

var _exploreActions = require('../../actions/exploreActions');

var _exploreActions2 = _interopRequireDefault(_exploreActions);

var _profileView = require('./profileView');

var _profileView2 = _interopRequireDefault(_profileView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import Sorter from './sorter'
//import Filter from './filter'

var Explore = function (_React$Component) {
  _inherits(Explore, _React$Component);

  function Explore() {
    _classCallCheck(this, Explore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Explore).call(this));

    _this.state = _exploreStore2.default.setProfileState();
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(Explore, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _exploreStore2.default.addChangeListener(this._onChange);
      _exploreActions2.default.getPhotographers();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _exploreStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.state = _exploreStore2.default.setProfileState();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_exploreHeader2.default, null),
        _react2.default.createElement(_profileView2.default, null)
      );
    }
  }]);

  return Explore;
}(_react2.default.Component);

exports.default = Explore;

},{"../../actions/exploreActions":1,"../../stores/exploreStore":23,"../authenticatedComponent":5,"./exploreHeader":13,"./profileView":15,"react":"react","react-router":"react-router"}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _exploreActions = require('../../actions/exploreActions');

var _exploreActions2 = _interopRequireDefault(_exploreActions);

var _exploreStore = require('../../stores/exploreStore');

var _exploreStore2 = _interopRequireDefault(_exploreStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var exploreHeader = function (_React$Component) {
  _inherits(exploreHeader, _React$Component);

  function exploreHeader() {
    _classCallCheck(this, exploreHeader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(exploreHeader).call(this));

    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(exploreHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _exploreStore2.default.addChangeListener(this._onChange);
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _exploreStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'submitLocation',
    value: function submitLocation(e) {
      e.preventDefault();
      _exploreActions2.default.searchLocation(this.refs.focus.value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'callout hero small explore' },
        _react2.default.createElement(
          'div',
          { className: 'input-group small-centered location' },
          _react2.default.createElement(
            'form',
            { onSubmit: this.submitLocation },
            _react2.default.createElement('input', { className: 'input-group-field', ref: 'focus', onChange: this.handleLocationChange, placeholder: 'Where is your next event?', type: 'text' }),
            _react2.default.createElement(
              'div',
              { className: 'input-group-button' },
              _react2.default.createElement('input', { type: 'submit', className: 'button', value: 'Submit', onClick: this.submitLocation })
            )
          )
        )
      );
    }
  }]);

  return exploreHeader;
}(_react2.default.Component);

exports.default = exploreHeader;

},{"../../actions/exploreActions":1,"../../stores/exploreStore":23,"react":"react","react-dom":"react-dom"}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _exploreActions = require('../../actions/exploreActions');

var _exploreActions2 = _interopRequireDefault(_exploreActions);

var _exploreStore = require('../../stores/exploreStore');

var _exploreStore2 = _interopRequireDefault(_exploreStore);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var profileCard = function (_React$Component) {
  _inherits(profileCard, _React$Component);

  function profileCard() {
    _classCallCheck(this, profileCard);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(profileCard).call(this));
  }

  // componentDidMount() {
  //   ExploreStore.addChangeListener(this._onChange);
  // }

  // componentWillUnmount() {
  //   ExploreStore.removeChangeListener(this._onChange);
  // }

  // This will be called when the user clicks on the login button

  _createClass(profileCard, [{
    key: 'render',
    value: function render() {
      console.log("in cards");
      var photographer = this.props.photographer;
      var id = photographer._id;
      var profileLink = '/photographer/' + id;
      var coverImageLink = '/img/users/cover/' + photographer.coverImageLink;
      var avatarImageLink = '/img/users/cover/' + photographer.avatarImageLink;
      var name = photographer.firstName + " " + photographer.lastName;
      var location = photographer.location;

      var ratings = photographer.ratings;
      var stars = [];
      for (var i = 0; i < ratings; i++) {
        stars.push(_react2.default.createElement('i', { className: 'fa fa-star' }));
      }
      if (ratings - Math.floor(ratings) > 0.5) {
        stars.push(_react2.default.createElement('i', { className: 'fa fa-star-half-o' }));
      }

      var specialities = photographer.specialities;
      var labels = [];
      for (var i = 0; i < photographer.specialities.length && i < 4; i++) {
        labels.push(_react2.default.createElement(
          'span',
          { key: i, className: 'label' },
          photographer.specialities[i]
        ));
      }
      return _react2.default.createElement(
        'div',
        { className: 'large-4 columns' },
        _react2.default.createElement(
          'div',
          { className: 'profile-card' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: profileLink },
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement('img', { src: coverImageLink })
            ),
            _react2.default.createElement(
              'div',
              { className: 'avatar' },
              _react2.default.createElement('img', { src: avatarImageLink })
            ),
            _react2.default.createElement(
              'div',
              { className: 'profile-info' },
              _react2.default.createElement(
                'h5',
                null,
                name
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement('i', { className: 'fa fa-map-marker' }),
                '  ',
                location,
                ' ·',
                _react2.default.createElement(
                  'span',
                  { className: 'rating' },
                  stars
                ),
                '(81)'
              ),
              _react2.default.createElement(
                'div',
                { className: 'specialty' },
                labels,
                _react2.default.createElement(
                  'span',
                  { className: 'label' },
                  '...'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return profileCard;
}(_react2.default.Component);

exports.default = profileCard;

},{"../../actions/exploreActions":1,"../../stores/exploreStore":23,"react":"react","react-dom":"react-dom","react-router":"react-router"}],15:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _exploreActions = require('../../actions/exploreActions');

var _exploreActions2 = _interopRequireDefault(_exploreActions);

var _exploreStore = require('../../stores/exploreStore');

var _exploreStore2 = _interopRequireDefault(_exploreStore);

var _profileCard = require('./profileCard');

var _profileCard2 = _interopRequireDefault(_profileCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileView = function (_React$Component) {
  _inherits(ProfileView, _React$Component);

  function ProfileView() {
    _classCallCheck(this, ProfileView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileView).call(this));

    _this.state = _exploreStore2.default.setProfileState();
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(ProfileView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _exploreStore2.default.addChangeListener(this._onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _exploreStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_exploreStore2.default.setProfileState());
      console.log("updating state");
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("state:");
      console.log(this.state.profiles);
      var that = this;
      var profileCards = this.state.profiles.map(function (p) {
        return _react2.default.createElement(_profileCard2.default, _extends({ key: p._id }, that.props, { photographer: p }));
      });

      return _react2.default.createElement(
        'div',
        { className: 'row section' },
        profileCards
      );
    }
  }]);

  return ProfileView;
}(_react2.default.Component);

exports.default = ProfileView;

},{"../../actions/exploreActions":1,"../../stores/exploreStore":23,"./profileCard":14,"react":"react","react-dom":"react-dom"}],16:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  UPDATE_SORT: 'UPDATE_SORT',
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_PHOTOS: 'UPDATE_PHOTOS'
});

},{"key-mirror":32}],17:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  GET_PHOTOGRAPHER: 'GET_PHOTOGRAPHER'
});

},{"key-mirror":32}],18:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  LOGIN_PHOTOGRAPHER: 'LOGIN_PHOTOGRAPHER'
});

},{"key-mirror":32}],19:[function(require,module,exports){
'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function handleViewAction(action) {
    console.log(action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;

},{"flux":29,"react/lib/Object.assign":35}],20:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _routes2.default
), document.getElementById('app'));

},{"./routes":21,"react":"react","react-dom":"react-dom","react-router":"react-router"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _login = require('./components/navbar/login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('./components/navbar/signup');

var _signup2 = _interopRequireDefault(_signup);

var _home = require('./components/home');

var _home2 = _interopRequireDefault(_home);

var _explore = require('./components/user/explore');

var _explore2 = _interopRequireDefault(_explore);

var _profile = require('./components/photographer/profile');

var _profile2 = _interopRequireDefault(_profile);

var _apply = require('./components/photographer/apply');

var _apply2 = _interopRequireDefault(_apply);

var _requireAuth = require('./utils/requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Explore Page
exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _app2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _login2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _signup2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/home', component: _explore2.default, onEnter: _requireAuth2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/photographers/:id', component: _profile2.default, onEnter: _requireAuth2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/apply', component: _apply2.default })
);

//Authentication for Routing

// Home Page

// NavBar

},{"./components/app":4,"./components/home":6,"./components/navbar/login":7,"./components/navbar/signup":9,"./components/photographer/apply":10,"./components/photographer/profile":11,"./components/user/explore":12,"./utils/requireAuth":26,"react":"react","react-router":"react-router"}],22:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _appDispatcher = require('../dispatchers/appDispatcher');

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseStore = function (_EventEmitter) {
  _inherits(BaseStore, _EventEmitter);

  function BaseStore() {
    _classCallCheck(this, BaseStore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseStore).call(this));
  }

  _createClass(BaseStore, [{
    key: 'subscribe',
    value: function subscribe(actionSubscribe) {
      this._dispatchToken = _appDispatcher2.default.register(actionSubscribe());
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      this.emit('CHANGE');
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(cb) {
      this.on('CHANGE', cb);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(cb) {
      this.removeListener('CHANGE', cb);
    }
  }, {
    key: 'dispatchToken',
    get: function get() {
      return this._dispatchToken;
    }
  }]);

  return BaseStore;
}(_events.EventEmitter);

exports.default = BaseStore;

},{"../dispatchers/appDispatcher":19,"events":27}],23:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _exploreConstants = require('../constants/exploreConstants');

var _baseStore = require('./baseStore');

var _baseStore2 = _interopRequireDefault(_baseStore);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExploreStore = function (_BaseStore) {
  _inherits(ExploreStore, _BaseStore);

  function ExploreStore() {
    _classCallCheck(this, ExploreStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ExploreStore).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._location = null;
    _this._profiles = [];
    return _this;
  }

  _createClass(ExploreStore, [{
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case _exploreConstants.UPDATE_PHOTOS:
          console.log("UPDATE_PHOTOS REACHED");
          console.log("updating photos");
          this._profiles = action.profiles;
          console.log(this._profiles);
          this.emitChange();
          break;
        case _exploreConstants.UPDATE_FILTER:
          console.log("setting store");
          this._lastName = action.data.lastName;
          this._firstName = action.data.firstName;
          this._email = action.data.email;
          this._isLoggedIn = true;

          this.emitChange();
          _reactRouter.browserHistory.push('/');

          break;
        case _exploreConstants.UPDATE_SORT:
          console.log("clearing store");
          this._email = null;
          this._firstName = null;
          this._lastName = null;
          this._isLoggedIn = false;
          this.emitChange();
          break;
        default:
          break;
      };
    }
  }, {
    key: 'setProfileState',
    value: function setProfileState() {
      return {
        profiles: this._profiles
      };
    }
  }, {
    key: 'getLocationState',
    value: function getLocationState() {
      return { location: this._location };
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn() {
      return !!this._email;
    }
  }, {
    key: 'firstName',
    get: function get() {
      return this._firstName;
    }
  }, {
    key: 'lastName',
    get: function get() {
      return this._lastName;
    }
  }, {
    key: 'email',
    get: function get() {
      return this._email;
    }
  }]);

  return ExploreStore;
}(_baseStore2.default);

exports.default = new ExploreStore();

},{"../constants/exploreConstants":16,"./baseStore":22,"react-router":"react-router"}],24:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _photographerConstants = require('../constants/photographerConstants');

var _baseStore = require('./baseStore');

var _baseStore2 = _interopRequireDefault(_baseStore);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionStore = function (_BaseStore) {
  _inherits(SessionStore, _BaseStore);

  function SessionStore() {
    _classCallCheck(this, SessionStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SessionStore).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._firstName = null;
    _this._lastName = null;
    _this._email = null;
    _this._isLoggedIn = false;
    return _this;
  }

  _createClass(SessionStore, [{
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case _photographerConstants.GET_PHOTOGRAPHER:
          this._lastName = action.data.lastName;
          this._firstName = action.data.firstName;
          this._email = action.data.email;
          this._isLoggedIn = true;

          this.emitChange();
          _reactRouter.browserHistory.push('/home'); //redirect after state changes
          break;
        default:
          break;
      };
    }
  }, {
    key: 'getState',
    value: function getState() {
      return {
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        isLoggedIn: this._isLoggedIn
      };
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn() {
      return !!this._email;
    }
  }, {
    key: 'firstName',
    get: function get() {
      return this._firstName;
    }
  }, {
    key: 'lastName',
    get: function get() {
      return this._lastName;
    }
  }, {
    key: 'email',
    get: function get() {
      return this._email;
    }
  }]);

  return SessionStore;
}(_baseStore2.default);

exports.default = new SessionStore();

},{"../constants/photographerConstants":17,"./baseStore":22,"react-router":"react-router"}],25:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sessionConstants = require('../constants/sessionConstants');

var _baseStore = require('./baseStore');

var _baseStore2 = _interopRequireDefault(_baseStore);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionStore = function (_BaseStore) {
  _inherits(SessionStore, _BaseStore);

  function SessionStore() {
    _classCallCheck(this, SessionStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SessionStore).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._firstName = null;
    _this._lastName = null;
    _this._email = null;
    _this._isLoggedIn = false;
    return _this;
  }

  _createClass(SessionStore, [{
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case _sessionConstants.LOGIN_USER:
          console.log("LOGIN_USER REACHED");
          this._lastName = action.data.lastName;
          this._firstName = action.data.firstName;
          this._email = action.data.email;
          this._isLoggedIn = true;

          this.emitChange();
          _reactRouter.browserHistory.push('/home'); //redirect after state changes
          break;
        case _sessionConstants.LOGIN_PHOTOGRAPHER:
          console.log("LOGIN_PHOTOGRAPHER REACHED");
          this._lastName = action.data.lastName;
          this._firstName = action.data.firstName;
          this._email = action.data.email;
          this._isLoggedIn = true;
        case _sessionConstants.LOGOUT_USER:
          console.log("LOGOUT_USER REACHED");
          this._email = null;
          this._firstName = null;
          this._lastName = null;
          this._isLoggedIn = false;
          this.emitChange();
          break;
        default:
          break;
      };
    }
  }, {
    key: 'getState',
    value: function getState() {
      return {
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        isLoggedIn: this._isLoggedIn
      };
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn() {
      return !!this._email;
    }
  }, {
    key: 'firstName',
    get: function get() {
      return this._firstName;
    }
  }, {
    key: 'lastName',
    get: function get() {
      return this._lastName;
    }
  }, {
    key: 'email',
    get: function get() {
      return this._email;
    }
  }]);

  return SessionStore;
}(_baseStore2.default);

exports.default = new SessionStore();

},{"../constants/sessionConstants":18,"./baseStore":22,"react-router":"react-router"}],26:[function(require,module,exports){
'use strict';

var _sessionStore = require('../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requireAuth(nextState, replace) {
  console.log("evoked requireAuth");
  if (!_sessionStore2.default.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

module.exports = requireAuth;

},{"../stores/sessionStore":25}],27:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],28:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],29:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":30}],30:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = require('fbjs/lib/invariant');

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
}).call(this,require('_process'))
},{"_process":28,"fbjs/lib/invariant":31}],31:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":28}],32:[function(require,module,exports){

'use strict';

module.exports =

    /**
     * Takes in a {key:val} and returns a key:key
     *  
     * @param object {key1 : val1 ... keyn:valn}
     */
    function(obj) {
        var key;
        var mirrored = {};

        if ( obj && typeof obj === 'object' ) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    mirrored[key] = key;
                }
            }
        }
        return mirrored;
    };

},{}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _attrAccept = require('attr-accept');

var _attrAccept2 = _interopRequireDefault(_attrAccept);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;

var Dropzone = (function (_React$Component) {
  _inherits(Dropzone, _React$Component);

  function Dropzone(props, context) {
    _classCallCheck(this, Dropzone);

    _React$Component.call(this, props, context);
    this.onClick = this.onClick.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      isDragActive: false
    };
  }

  Dropzone.prototype.componentDidMount = function componentDidMount() {
    this.enterCounter = 0;
  };

  Dropzone.prototype.onDragEnter = function onDragEnter(e) {
    e.preventDefault();

    // Count the dropzone and any children that are entered.
    ++this.enterCounter;

    // This is tricky. During the drag even the dataTransfer.files is null
    // But Chrome implements some drag store, which is accesible via dataTransfer.items
    var dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];

    // Now we need to convert the DataTransferList to Array
    var allFilesAccepted = this.allFilesAccepted(Array.prototype.slice.call(dataTransferItems));

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    });

    if (this.props.onDragEnter) {
      this.props.onDragEnter.call(this, e);
    }
  };

  Dropzone.prototype.onDragOver = function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  Dropzone.prototype.onDragLeave = function onDragLeave(e) {
    e.preventDefault();

    // Only deactivate once the dropzone and all children was left.
    if (--this.enterCounter > 0) {
      return;
    }

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    if (this.props.onDragLeave) {
      this.props.onDragLeave.call(this, e);
    }
  };

  Dropzone.prototype.onDrop = function onDrop(e) {
    e.preventDefault();

    // Reset the counter along with the drag on a drop.
    this.enterCounter = 0;

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    var max = this.props.multiple ? droppedFiles.length : 1;
    var files = [];

    for (var i = 0; i < max; i++) {
      var file = droppedFiles[i];
      // We might want to disable the preview creation to support big files
      if (!this.props.disablePreview) {
        file.preview = window.URL.createObjectURL(file);
      }
      files.push(file);
    }

    if (this.props.onDrop) {
      this.props.onDrop.call(this, files, e);
    }

    if (this.allFilesAccepted(files)) {
      if (this.props.onDropAccepted) {
        this.props.onDropAccepted.call(this, files, e);
      }
    } else {
      if (this.props.onDropRejected) {
        this.props.onDropRejected.call(this, files, e);
      }
    }
  };

  Dropzone.prototype.onClick = function onClick() {
    if (!this.props.disableClick) {
      this.open();
    }
  };

  Dropzone.prototype.allFilesAccepted = function allFilesAccepted(files) {
    var _this = this;

    return files.every(function (file) {
      return _attrAccept2['default'](file, _this.props.accept);
    });
  };

  Dropzone.prototype.open = function open() {
    this.fileInputEl.value = null;
    this.fileInputEl.click();
  };

  Dropzone.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var accept = _props.accept;
    var activeClassName = _props.activeClassName;
    var inputProps = _props.inputProps;
    var multiple = _props.multiple;
    var name = _props.name;
    var rejectClassName = _props.rejectClassName;

    var rest = _objectWithoutProperties(_props, ['accept', 'activeClassName', 'inputProps', 'multiple', 'name', 'rejectClassName']);

    var activeStyle = // eslint-disable-line prefer-const
    rest.activeStyle;
    var className = rest.className;
    var rejectStyle = rest.rejectStyle;
    var style = rest.style;

    var props = _objectWithoutProperties(rest, ['activeStyle', 'className', 'rejectStyle', 'style']);

    var _state = this.state;
    var isDragActive = _state.isDragActive;
    var isDragReject = _state.isDragReject;

    className = className || '';

    if (isDragActive && activeClassName) {
      className += ' ' + activeClassName;
    }
    if (isDragReject && rejectClassName) {
      className += ' ' + rejectClassName;
    }

    if (!className && !style && !activeStyle && !rejectStyle) {
      style = {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5
      };
      activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      };
      rejectStyle = {
        borderStyle: 'solid',
        backgroundColor: '#ffdddd'
      };
    }

    var appliedStyle = undefined;
    if (activeStyle && isDragActive) {
      appliedStyle = _extends({}, style, activeStyle);
    } else if (rejectStyle && isDragReject) {
      appliedStyle = _extends({}, style, rejectStyle);
    } else {
      appliedStyle = _extends({}, style);
    }

    var inputAttributes = {
      accept: accept,
      type: 'file',
      style: { display: 'none' },
      multiple: supportMultiple && multiple,
      ref: function ref(el) {
        return _this2.fileInputEl = el;
      },
      onChange: this.onDrop
    };

    if (name && name.length) {
      inputAttributes.name = name;
    }

    return _react2['default'].createElement(
      'div',
      _extends({
        className: className,
        style: appliedStyle
      }, props, /* expand user provided props first so event handlers are never overridden */{
        onClick: this.onClick,
        onDragEnter: this.onDragEnter,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDrop: this.onDrop
      }),
      this.props.children,
      _react2['default'].createElement('input', _extends({}, inputProps, /* expand user provided inputProps first so inputAttributes override them */inputAttributes))
    );
  };

  return Dropzone;
})(_react2['default'].Component);

Dropzone.defaultProps = {
  disablePreview: false,
  disableClick: false,
  multiple: true
};

Dropzone.propTypes = {
  onDrop: _react2['default'].PropTypes.func,
  onDropAccepted: _react2['default'].PropTypes.func,
  onDropRejected: _react2['default'].PropTypes.func,
  onDragEnter: _react2['default'].PropTypes.func,
  onDragLeave: _react2['default'].PropTypes.func,

  children: _react2['default'].PropTypes.node,
  style: _react2['default'].PropTypes.object,
  activeStyle: _react2['default'].PropTypes.object,
  rejectStyle: _react2['default'].PropTypes.object,
  className: _react2['default'].PropTypes.string,
  activeClassName: _react2['default'].PropTypes.string,
  rejectClassName: _react2['default'].PropTypes.string,

  disablePreview: _react2['default'].PropTypes.bool,
  disableClick: _react2['default'].PropTypes.bool,

  inputProps: _react2['default'].PropTypes.object,
  multiple: _react2['default'].PropTypes.bool,
  accept: _react2['default'].PropTypes.string,
  name: _react2['default'].PropTypes.string
};

exports['default'] = Dropzone;
module.exports = exports['default'];
},{"attr-accept":34,"react":"react"}],34:[function(require,module,exports){
module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){"use strict";n.__esModule=!0,r(8),r(9),n["default"]=function(t,n){if(t&&n){var r=function(){var r=n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return{v:r.some(function(t){var n=t.trim();return"."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):/\/\*$/.test(n)?i===n.replace(/\/.*$/,""):o===n})}}();if("object"==typeof r)return r.v}return!0},t.exports=n["default"]},function(t,n){var r=t.exports={version:"1.2.2"};"number"==typeof __e&&(__e=r)},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(2),o=r(1),i=r(4),u=r(19),c="prototype",f=function(t,n){return function(){return t.apply(n,arguments)}},s=function(t,n,r){var a,p,l,d,y=t&s.G,h=t&s.P,v=y?e:t&s.S?e[n]||(e[n]={}):(e[n]||{})[c],x=y?o:o[n]||(o[n]={});y&&(r=n);for(a in r)p=!(t&s.F)&&v&&a in v,l=(p?v:r)[a],d=t&s.B&&p?f(l,e):h&&"function"==typeof l?f(Function.call,l):l,v&&!p&&u(v,a,l),x[a]!=l&&i(x,a,d),h&&((x[c]||(x[c]={}))[a]=l)};e.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,n,r){var e=r(5),o=r(18);t.exports=r(22)?function(t,n,r){return e.setDesc(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){var e=r(20)("wks"),o=r(2).Symbol;t.exports=function(t){return e[t]||(e[t]=o&&o[t]||(o||r(6))("Symbol."+t))}},function(t,n,r){r(26),t.exports=r(1).Array.some},function(t,n,r){r(25),t.exports=r(1).String.endsWith},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r(7)("match")]=!1,!"/./"[t](n)}catch(o){}}return!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(16),o=r(11),i=r(7)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(2),o=r(4),i=r(6)("src"),u="toString",c=Function[u],f=(""+c).split(u);r(1).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,u){"function"==typeof r&&(o(r,i,t[n]?""+t[n]:f.join(String(n))),"name"in r||(r.name=n)),t===e?t[n]=r:(u||delete t[n],o(t,n,r))})(Function.prototype,u,function(){return"function"==typeof this&&this[i]||c.call(this)})},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e=r(17),o=r(13);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){t.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){"use strict";var e=r(3),o=r(24),i=r(21),u="endsWith",c=""[u];e(e.P+e.F*r(14)(u),"String",{endsWith:function(t){var n=i(this,t,u),r=arguments,e=r.length>1?r[1]:void 0,f=o(n.length),s=void 0===e?f:Math.min(o(e),f),a=String(t);return c?c.call(n,a,s):n.slice(s-a.length,s)===a}})},function(t,n,r){var e=r(5),o=r(3),i=r(1).Array||Array,u={},c=function(t,n){e.each.call(t.split(","),function(t){void 0==n&&t in i?u[t]=i[t]:t in[]&&(u[t]=r(12)(Function.call,[][t],n))})};c("pop,reverse,shift,keys,values,entries",1),c("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),c("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",u)}]);
},{}],35:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports = assign;
},{}]},{},[20]);
