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
    key: 'getUserInfo',
    value: function getUserInfo() {
      console.log(LOGIN_USER);
      $.ajax({ type: 'GET', url: '/api/sessions' }).done(function (userData) {
        _appDispatcher2.default.handleViewAction({
          actionType: LOGIN_USER,
          data: userData
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
        // if (data.success) {
        //   browserHistory.push('/');
        // }
        // else {

        // }
      });
      // .fail(function (jqXhr) {
      //   console.log(jqXhr.responseJSON.message);
      // })
    }
  }, {
    key: 'signup',
    value: function signup(signupData) {
      return $.ajax({ type: 'POST', url: '/api/users', data: signupData }).done(function (data) {
        console.log("here");
        if (!data.success) {
          _appDispatcher2.default.handleViewAction({
            actionType: FAILEDSIGNUP,
            message: data.message
          });
        } else {
          console.log("data: ", data);
          SessionActions.login(signupData);
        }
      });
    }
  }]);

  return ExploreActions;
}();

exports.default = ExploreActions;

},{"../constants/exploreConstants.js":11,"../dispatchers/appDispatcher.js":13}],2:[function(require,module,exports){
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
      console.log(_sessionConstants.LOGIN_USER);
      $.ajax({ type: 'GET', url: '/api/sessions' }).done(function (userData) {
        _appDispatcher2.default.handleViewAction({
          actionType: _sessionConstants.LOGIN_USER,
          data: userData
        });
        //localStorage.setItem('user', userData.email)
      });
    }
  }, {
    key: 'login',
    value: function login(loginData, cb) {
      $.ajax({ type: 'POST', url: '/api/sessions', data: loginData }).done(function (data) {
        if (!data.success) {
          console.log("failure...");
          console.log(_sessionConstants.UNAUTHORIZED);
          _appDispatcher2.default.handleViewAction({
            actionType: _sessionConstants.UNAUTHORIZED,
            message: data.message
          });
          if (cb) cb(false);
        } else {
          console.log("validCredentials!");
          if (cb) cb(true);
          SessionActions.getUserInfo();
        }
        // if (data.success) {
        //   browserHistory.push('/');
        // }
        // else {

        // }
      });
      // .fail(function (jqXhr) {
      //   console.log(jqXhr.responseJSON.message);
      // })
    }
  }, {
    key: 'signup',
    value: function signup(signupData) {
      return $.ajax({ type: 'POST', url: '/api/users', data: signupData }).done(function (data) {
        if (!data.success) {
          _appDispatcher2.default.handleViewAction({
            actionType: _sessionConstants.FAILEDSIGNUP,
            message: data.message
          });
        } else {
          SessionActions.login(signupData);
        }
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

},{"../constants/sessionConstants.js":12,"../dispatchers/appDispatcher.js":13,"react-router":"react-router"}],3:[function(require,module,exports){
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

},{"../stores/sessionStore":19,"./navbar/navbar.js":7,"react":"react"}],4:[function(require,module,exports){
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

    _createClass(AuthenticatedComponent, null, [{
      key: 'willTransitionTo',
      value: function willTransitionTo(transition) {
        console.log("made it here");
        if (!_sessionStore2.default.isLoggedIn()) {
          transition.redirect('/login');
        }
      }
    }]);

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

},{"../stores/sessionStore":19,"react":"react"}],5:[function(require,module,exports){
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
            'Step 1: Tell us your needs.'
          ),
          _react2.default.createElement(
            'div',
            { className: 'large-4 columns' },
            'Step 2: Browse and choose photographers.'
          ),
          _react2.default.createElement(
            'div',
            { className: 'large-4 columns' },
            'Step 3: Request a quote!'
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
            'Apply Now'
          )
        )
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = (0, _authenticatedComponent2.default)(Home);

},{"./authenticatedComponent":4,"react":"react","react-router":"react-router"}],6:[function(require,module,exports){
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

var _loginStore = require('../../stores/loginStore');

var _loginStore2 = _interopRequireDefault(_loginStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this));

    _this.state = _loginStore2.default.getInputState();
    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
    _this.handlePwdChange = _this.handlePwdChange.bind(_this);
    _this.login = _this.login.bind(_this);
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _loginStore2.default.addChangeListener(this._onChange);
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _loginStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_loginStore2.default.getInputState());
      console.log(this.state);
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
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
      var _this2 = this;

      e.preventDefault();

      var loginData = {
        email: this.state.email,
        password: this.state.password
      };

      _sessionActions2.default.login(loginData, function (loggedIn) {
        if (!loggedIn) return _this2.setState({ message: "Incorrect Username/Password" });

        var location = _this2.props.location;

        if (location.state && location.state.nextPathname) {
          _this2.context.router.replace(location.state.nextPathname);
        } else {
          _this2.context.router.replace('/');
        }
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
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

Login.contextTypes = {
  router: _react2.default.PropTypes.func.isRequired
};

exports.default = Login;

},{"../../actions/sessionActions":2,"../../stores/loginStore":18,"react":"react","react-dom":"react-dom"}],7:[function(require,module,exports){
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

},{"../../actions/sessionActions":2,"../../stores/sessionStore":19,"react":"react","react-router":"react-router"}],8:[function(require,module,exports){
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

var _signupStore = require('../../stores/signupStore');

var _signupStore2 = _interopRequireDefault(_signupStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup() {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Signup).call(this));

    _this.state = _signupStore2.default.getInputState();
    _this.handleEmailChange = _this.handleEmailChange.bind(_this);
    _this.handlePwdChange = _this.handlePwdChange.bind(_this);
    _this.handleLastNameChange = _this.handleLastNameChange.bind(_this);
    _this.handleFirstNameChange = _this.handleFirstNameChange.bind(_this);
    _this.handleConfirmChange = _this.handleConfirmChange.bind(_this);
    _this.signup = _this.signup.bind(_this);
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(Signup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _signupStore2.default.addChangeListener(this._onChange);
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _signupStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {

      this.setState(_signupStore2.default.getInputState());
      console.log("changing state:", this.state);
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
    }
  }, {
    key: 'handleFirstNameChange',
    value: function handleFirstNameChange(e) {
      this.setState({ firstName: e.target.value });
    }
  }, {
    key: 'handleLastNameChange',
    value: function handleLastNameChange(e) {
      this.setState({ lastName: e.target.value });
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
  }, {
    key: 'handleConfirmChange',
    value: function handleConfirmChange(e) {
      this.setState({ confirm: e.target.value });
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'signup',
    value: function signup(e) {
      e.preventDefault();
      console.log(this.state.email, this.state.password);
      if (this.state.password !== this.state.confirm) {
        this.setState({ message: "Passwords don't match" });
      } else {
        var signupData = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        };
        console.log("asdf", signupData);
        _sessionActions2.default.signup(signupData).fail(function (err) {
          alert("There's an error signing up");
          console.log("Error signing in", err);
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
          _react2.default.createElement('input', { type: 'text', ref: 'focus', onChange: this.handleFirstNameChange, value: this.state.firstName, className: 'form-control', name: 'firstname', id: 'firstname', placeholder: 'First name' }),
          _react2.default.createElement('input', { type: 'text', onChange: this.handleLastNameChange, value: this.state.lastName, className: 'form-control', name: 'lastname', id: 'lastname', placeholder: 'Last name' }),
          _react2.default.createElement('input', { type: 'text', onChange: this.handleEmailChange, value: this.state.email, className: 'form-control', name: 'email', id: 'email', placeholder: 'Email' }),
          _react2.default.createElement('input', { type: 'password', onChange: this.handlePwdChange, value: this.state.password, className: 'form-control', id: 'password', ref: 'password', placeholder: 'Password' }),
          _react2.default.createElement('input', { type: 'password', onChange: this.handleConfirmChange, value: this.state.confirm, className: 'form-control', id: 'password', ref: 'password', placeholder: 'Confirm password' }),
          _react2.default.createElement('input', { type: 'submit', value: 'Sign Up', className: 'expanded button' })
        )
      );
    }
  }]);

  return Signup;
}(_react2.default.Component);

exports.default = Signup;

},{"../../actions/sessionActions":2,"../../stores/signupStore":20,"react":"react","react-dom":"react-dom","react-router":"react-router"}],9:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Sorter from './explore/sorter'
//import Filter from './explore/filter'
//import ProfileView from './explore/profileView'

var Explore = function (_React$Component) {
  _inherits(Explore, _React$Component);

  function Explore() {
    _classCallCheck(this, Explore);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Explore).apply(this, arguments));
  }

  _createClass(Explore, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_exploreHeader2.default, null)
      );
    }
  }]);

  return Explore;
}(_react2.default.Component);

exports.default = (0, _authenticatedComponent2.default)(Explore);

},{"../authenticatedComponent":4,"./exploreHeader":10,"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
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

    _this.state = _exploreStore2.default.getLocationState();
    _this.handleLocationChange = _this.handleLocationChange.bind(_this);
    _this.submitLocation = _this.submitLocation.bind(_this);
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
      this.setState(LoginStore.getLocationState());
      _reactDom2.default.findDOMNode(this.refs.focus).focus();
    }
  }, {
    key: 'handleLocationChange',
    value: function handleLocationChange(e) {
      this.setState({ location: e.target.value });
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'submitLocation',
    value: function submitLocation(e) {
      e.preventDefault();
      var loginData = {
        email: this.state.email,
        password: this.state.password
      };

      _exploreActions2.default.login(loginData).fail(function (err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
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
          _react2.default.createElement('input', { className: 'input-group-field', ref: 'focus', onChange: this.handleLocationChange, placeholder: 'Where is your next event?', type: 'text' }),
          _react2.default.createElement(
            'div',
            { className: 'input-group-button' },
            _react2.default.createElement('input', { type: 'submit', className: 'button', value: 'Submit', onClick: this.submitLocation })
          )
        )
      );
    }
  }]);

  return exploreHeader;
}(_react2.default.Component);

exports.default = exploreHeader;

},{"../../actions/exploreActions":1,"../../stores/exploreStore":17,"react":"react","react-dom":"react-dom"}],11:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  UPDATE_SORT: 'UPDATE_SORT',
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_PHOTOS: 'UPDATE_PHOTOS'
});

},{"key-mirror":27}],12:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FAILEDSIGNUP: 'FAILEDSIGNUP'
});

},{"key-mirror":27}],13:[function(require,module,exports){
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

},{"flux":24,"react/lib/Object.assign":28}],14:[function(require,module,exports){
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

},{"./routes":15,"react":"react","react-dom":"react-dom","react-router":"react-router"}],15:[function(require,module,exports){
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
  _react2.default.createElement(_reactRouter.Route, { path: '/home', component: _explore2.default, onEnter: _requireAuth2.default })
);

// Home Page

// NavBar

},{"./components/app":3,"./components/home":5,"./components/navbar/login":6,"./components/navbar/signup":8,"./components/user/explore":9,"./utils/requireAuth":21,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
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

},{"../dispatchers/appDispatcher":13,"events":22}],17:[function(require,module,exports){
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

var SessionStore = function (_BaseStore) {
  _inherits(SessionStore, _BaseStore);

  function SessionStore() {
    _classCallCheck(this, SessionStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SessionStore).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._location = null;
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

  return SessionStore;
}(_baseStore2.default);

exports.default = new SessionStore();

},{"../constants/exploreConstants":11,"./baseStore":16,"react-router":"react-router"}],18:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sessionConstants = require('../constants/sessionConstants');

var _baseStore = require('./baseStore');

var _baseStore2 = _interopRequireDefault(_baseStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import jwt_decode from 'jwt-decode';

var LoginStore = function (_BaseStore) {
  _inherits(LoginStore, _BaseStore);

  function LoginStore() {
    _classCallCheck(this, LoginStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginStore).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._email = '', _this._password = '';
    _this._message = '';
    return _this;
  }

  _createClass(LoginStore, [{
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case _sessionConstants.UNAUTHORIZED:
          this._message = action.message; // i have no idea why this is doing this
          this.emitChange();
          break;
        default:
          break;
      };
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
  }]);

  return LoginStore;
}(_baseStore2.default);

exports.default = new LoginStore();

},{"../constants/sessionConstants":12,"./baseStore":16}],19:[function(require,module,exports){
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
          console.log("setting store");
          this._lastName = action.data.lastName;
          this._firstName = action.data.firstName;
          this._email = action.data.email;
          this._isLoggedIn = true;

          this.emitChange();
          _reactRouter.browserHistory.push('/home'); //redirect after state changes

          break;
        case _sessionConstants.LOGOUT_USER:
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

},{"../constants/sessionConstants":12,"./baseStore":16,"react-router":"react-router"}],20:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sessionConstants = require('../constants/sessionConstants');

var _baseStore = require('./baseStore');

var _baseStore2 = _interopRequireDefault(_baseStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import jwt_decode from 'jwt-decode';

var SignupStore = function (_BaseStore) {
  _inherits(SignupStore, _BaseStore);

  function SignupStore() {
    _classCallCheck(this, SignupStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SignupStore).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._firstName = '';
    _this._lastName = '';
    _this._email = '';
    _this._password = '';
    _this._confirm = '';
    _this._message = '';
    return _this;
  }

  _createClass(SignupStore, [{
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      console.log("actionlogin: ", action);
      switch (action.actionType) {
        case _sessionConstants.FAILEDSIGNUP:
          this._message = action.message; // i have no idea why there is another action
          this.emitChange();
          break;
        default:
          break;
      };
    }
  }, {
    key: 'getInputState',
    value: function getInputState() {
      return {
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        password: this._password,
        confirm: this._confirm,
        message: this._message
      };
    }
  }]);

  return SignupStore;
}(_baseStore2.default);

exports.default = new SignupStore();

},{"../constants/sessionConstants":12,"./baseStore":16}],21:[function(require,module,exports){
'use strict';

var _sessionStore = require('../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requireAuth(nextState, replace) {
  if (!_sessionStore2.default.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

module.exports = requireAuth;

},{"../stores/sessionStore":19}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":25}],25:[function(require,module,exports){
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
},{"_process":23,"fbjs/lib/invariant":26}],26:[function(require,module,exports){
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
},{"_process":23}],27:[function(require,module,exports){

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

},{}],28:[function(require,module,exports){
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
},{}]},{},[14]);
