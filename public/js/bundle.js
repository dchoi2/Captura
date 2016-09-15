(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    value: function searchLocation(locData, cb) {
      return $.ajax({ type: 'POST', url: '/api/photographers/location', data: locData }).done(function (data) {
        if (!data.success) {
          console.log("failure...");
          cb(data);
        } else {
          console.log("location submitted");
          _appDispatcher2.default.handleViewAction({
            actionType: _exploreConstants.UPDATE_LOCATION,
            profiles: data.profiles, // should contain location
            locString: locData.city + ", " + locData.state,
            message: data.message
          });
        }
      });
    }
  }, {
    key: 'setFilters',
    value: function setFilters(filterList) {
      console.log("setting filters in exploreActions");
      _appDispatcher2.default.handleViewAction({
        actionType: _exploreConstants.UPDATE_FILTER,
        filters: filterList // should contain location
      });
    }
  }, {
    key: 'setSort',
    value: function setSort(sortBy) {
      _appDispatcher2.default.handleViewAction({
        actionType: _exploreConstants.UPDATE_SORT,
        sortBy: sortBy
      });
    }
  }]);

  return ExploreActions;
}();

exports.default = ExploreActions;

},{"../constants/exploreConstants.js":31,"../dispatchers/appDispatcher.js":36}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    key: 'getPhotographerAccountInfo',
    value: function getPhotographerAccountInfo(id) {
      $.ajax({ type: 'GET', url: '/api/photographers/account/' + id }).done(function (userData) {
        _appDispatcher2.default.handleViewAction({
          actionType: _photographerConstants.GET_PHOTOGRAPHER_ACCOUNT,
          data: userData
        });
      });
    }
  }, {
    key: 'applyFor',
    value: function applyFor(applyData, cb) {
      $.ajax({ type: 'POST', url: '/api/photographers/', data: applyData }).done(function (data) {
        console.log("sent Post");
        if (!data.success) {
          if (cb) cb(data);
        } else {
          console.log("success! ", data);

          //SessionActions.photographerLogin(applyData);
        }
      }).fail(function (data) {
        console.log("error happened", data);
      });
    }
  }]);

  return PhotographerActions;
}();

exports.default = PhotographerActions;

},{"../constants/photographerConstants.js":32,"../dispatchers/appDispatcher.js":36,"react-router":"react-router"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appDispatcher = require('../dispatchers/appDispatcher.js');

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _profileConstants = require('../constants/profileConstants.js');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import RouterContainer from '../services/RouterContainer'

var ProfileActions = function () {
  function ProfileActions() {
    _classCallCheck(this, ProfileActions);
  }

  _createClass(ProfileActions, null, [{
    key: 'getPhotographerProfileInfo',
    value: function getPhotographerProfileInfo(id) {
      $.ajax({ type: 'GET', url: '/api/photographers/public/' + id }).done(function (userData) {
        if (userData.success) {
          _appDispatcher2.default.handleViewAction({
            actionType: _profileConstants.GET_PHOTOGRAPHER_PROFILE,
            profile: userData.profile
          });
        } else {
          _reactRouter.browserHistory.push('/');
        }

        // getReviewDetails(userData.profile.reviews)
      });
    }
  }, {
    key: 'sendFavorite',
    value: function sendFavorite(id) {
      $.ajax({ type: 'POST', url: '/api/users/favorite/', data: { id: id } }).done(function (data) {
        if (data.success) {
          _appDispatcher2.default.handleViewAction({
            actionType: _profileConstants.UPDATE_FAVORITE,
            profile: data.profile,
            user: data.user
          });
        } else {
          console.log("failed: ", data.message);
        }
      });
    }
  }, {
    key: 'unFavorite',
    value: function unFavorite(id) {
      $.ajax({ type: 'DELETE', url: '/api/users/favorite/' + id }).done(function (data) {
        if (data.success) {
          _appDispatcher2.default.handleViewAction({
            actionType: _profileConstants.UPDATE_FAVORITE,
            profile: data.profile,
            user: data.user
          });
        } else {
          console.log("failed: ", data.message);
        }
      });
    }
  }]);

  return ProfileActions;
}();

exports.default = ProfileActions;

},{"../constants/profileConstants.js":33,"../dispatchers/appDispatcher.js":36,"react-router":"react-router"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    key: 'checkSession',
    value: function checkSession(cb) {
      $.ajax({ type: 'GET', url: '/api/sessions/users' }).done(function (data) {
        _appDispatcher2.default.handleViewAction({
          actionType: _sessionConstants.LOGIN_USER,
          user: data.user
        });

        localStorage.setItem('user', JSON.stringify(data.user));
        console.log("setting local storage user to ", localStorage.getItem('user'));
        if (cb) cb(data);
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
          SessionActions.checkSession();
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

},{"../constants/sessionConstants.js":34,"../dispatchers/appDispatcher.js":36,"react-router":"react-router"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appDispatcher = require('../dispatchers/appDispatcher.js');

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _userConstants = require('../constants/userConstants.js');

var _sessionActions = require('./sessionActions');

var _sessionActions2 = _interopRequireDefault(_sessionActions);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserActions = function () {
  function UserActions() {
    _classCallCheck(this, UserActions);
  }

  _createClass(UserActions, null, [{
    key: 'updateAccountInfo',
    value: function updateAccountInfo(uid, userInfo, cb) {
      $.ajax({ type: 'PUT', url: '/api/users/account/' + uid, data: userInfo }).done(function (data) {
        if (data.success) {
          console.log("user info updated");
          _appDispatcher2.default.handleViewAction({
            actionType: _userConstants.UPDATE_USER_INFO,
            user: data.user
          });
        }
        cb(data);
      });
    }
  }, {
    key: 'signup',
    value: function signup(signupData, cb) {
      $.ajax({ type: 'POST', url: '/api/users', data: signupData }).done(function (data) {
        if (!data.success) {
          if (cb) cb(data);
        } else {
          _sessionActions2.default.userLogin(signupData);
        }
      });
    }
  }, {
    key: 'getUserAccountInfo',
    value: function getUserAccountInfo(uid) {
      $.ajax({ type: 'GET', url: '/api/users/account/' + uid }).done(function (userData) {
        if (userData.success) {
          _appDispatcher2.default.handleViewAction({
            actionType: _userConstants.GET_USER_INFO,
            user: userData.user
          });
        } else {
          _reactRouter.browserHistory.push('/');
        }
      });
    }
  }, {
    key: 'searchLocation',
    value: function searchLocation(locData, cb) {
      return $.ajax({ type: 'POST', url: '/api/photographers/location', data: locData }).done(function (data) {
        if (!data.success) {
          console.log("failure...");
          cb(data);
        } else {
          console.log("location submitted");
          _appDispatcher2.default.handleViewAction({
            actionType: UPDATE_LOCATION,
            profiles: data.profiles // should contain location
          });
        }
      });
    }
  }]);

  return UserActions;
}();

exports.default = UserActions;

},{"../constants/userConstants.js":35,"../dispatchers/appDispatcher.js":36,"./sessionActions":4,"react-router":"react-router"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = _this._getLoginState();
    console.log("in app.js", _this.state);
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
      _sessionStore2.default.removeChangeListener(this.changeListener);
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

},{"../stores/sessionStore":42,"./navbar/navbar.js":16,"react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sessionStore = require('../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

var _sessionActions = require('../actions/sessionActions');

var _sessionActions2 = _interopRequireDefault(_sessionActions);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (ComposedComponent) {
  return function (_React$Component) {
    _inherits(AuthenticatedComponent, _React$Component);

    function AuthenticatedComponent() {
      _classCallCheck(this, AuthenticatedComponent);

      var _this = _possibleConstructorReturn(this, (AuthenticatedComponent.__proto__ || Object.getPrototypeOf(AuthenticatedComponent)).call(this));

      _this.state = _this._getLoginState();
      //this._checkLoggedIn();
      return _this;
    }

    _createClass(AuthenticatedComponent, [{
      key: '_getLoginState',
      value: function _getLoginState() {
        return {
          userLoggedIn: _sessionStore2.default.isLoggedIn(),
          user: _sessionStore2.default.user
        };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.changeListener = this._checkLoggedIn.bind(this);
        _sessionStore2.default.addChangeListener(this.changeListener);
      }
    }, {
      key: '_checkLoggedIn',
      value: function _checkLoggedIn() {
        var userLoggedInState = this._getLoginState();
        this.setState(userLoggedInState);

        //get any nextTransitionPath - NB it can only be got once then it self-nullifies
        // let transitionPath = RouterStore.nextTransitionPath || '/';

        //trigger router change
        console.log("&*&*&* App onLoginChange event: loggedIn=", userLoggedInState.userLoggedIn);
        // "nextTransitionPath=", transitionPath);

        if (userLoggedInState.userLoggedIn == false) {
          //   router.transitionTo(transitionPath);
          // }else{
          _reactRouter.browserHistory.push('/login');
        }
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

},{"../actions/sessionActions":4,"../stores/sessionStore":42,"react":"react","react-router":"react-router"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _sorter = require('./sorter');

var _sorter2 = _interopRequireDefault(_sorter);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _profileView = require('./profileView');

var _profileView2 = _interopRequireDefault(_profileView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explore = function (_React$Component) {
  _inherits(Explore, _React$Component);

  function Explore() {
    _classCallCheck(this, Explore);

    var _this = _possibleConstructorReturn(this, (Explore.__proto__ || Object.getPrototypeOf(Explore)).call(this));

    _this.state = _exploreStore2.default.setFullState();
    // this._onChange = this._onChange.bind(this);
    console.log("here in Explore");
    return _this;
  }

  _createClass(Explore, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      _exploreStore2.default.addChangeListener(this.changeListener);
      _exploreActions2.default.getPhotographers();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _exploreStore2.default.removeChangeListener(this.changeListener);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_exploreStore2.default.setFullState());
      console.log("setting full state");
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("in explore, location = ", this.state.location);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_exploreHeader2.default, { location: this.state.location }),
        _react2.default.createElement(_sorter2.default, null),
        _react2.default.createElement(_filter2.default, { location: this.state.location }),
        _react2.default.createElement(_profileView2.default, null)
      );
    }
  }]);

  return Explore;
}(_react2.default.Component);

exports.default = (0, _authenticatedComponent2.default)(Explore);

},{"../../actions/exploreActions":1,"../../stores/exploreStore":40,"../authenticatedComponent":7,"./exploreHeader":9,"./filter":10,"./profileView":12,"./sorter":13,"react":"react","react-router":"react-router"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    var _this = _possibleConstructorReturn(this, (exploreHeader.__proto__ || Object.getPrototypeOf(exploreHeader)).call(this));

    _this.state = { message: '' };
    _this.state = _exploreStore2.default.getLocation();
    //this.state = {location: ExploreStore.location}
    _this._onChange = _this._onChange.bind(_this);
    _this.submitLocation = _this.submitLocation.bind(_this);
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
      this.setState(_exploreStore2.default.getLocation());
      // ReactDOM.findDOMNode(this.refs.focus).focus()
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'submitLocation',
    value: function submitLocation(e) {
      e.preventDefault();
      var that = this;
      var loc = this.refs.focus.value.split(',');
      if (loc.length !== 2) {
        this.setState({ message: "Location must be of format: City, State" });
        _reactDom2.default.findDOMNode(this.refs.focus).focus();
      } else {
        var city = loc[0].trim();
        var state = loc[1].trim();
        var country = "US";
        _exploreActions2.default.searchLocation({ city: city, state: state, country: country }, function (data) {
          that.setState({ message: data.message });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'callout hero small explore' },
        _react2.default.createElement(
          'form',
          { className: 'location', onSubmit: this.submitLocation },
          _react2.default.createElement('input', { ref: 'focus', onChange: this.handleLocationChange, placeholder: 'Where is your next event?', type: 'text' }),
          this.state.message ? _react2.default.createElement(
            'p',
            { className: 'help-text' },
            this.state.message
          ) : null,
          _react2.default.createElement('input', { type: 'submit', className: 'button', value: 'Search' })
        )
      );
    }
  }]);

  return exploreHeader;
}(_react2.default.Component);

exports.default = exploreHeader;

},{"../../actions/exploreActions":1,"../../stores/exploreStore":40,"react":"react","react-dom":"react-dom"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _exploreActions = require('../../actions/exploreActions');

var _exploreActions2 = _interopRequireDefault(_exploreActions);

var _exploreStore = require('../../stores/exploreStore');

var _exploreStore2 = _interopRequireDefault(_exploreStore);

var _specialitiesTools = require('../../utils/specialitiesTools');

var _specialitiesTools2 = _interopRequireDefault(_specialitiesTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_React$Component) {
  _inherits(Filter, _React$Component);

  function Filter() {
    _classCallCheck(this, Filter);

    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this));

    _this.state = _this.resetFilteredState();
    _this._onChange = _this._onChange.bind(_this);
    _this.submitFilters = _this.submitFilters.bind(_this);
    _this.toggleFilter = _this.toggleFilter.bind(_this);
    _this.clearFilters = _this.clearFilters.bind(_this);
    _this.state.open = false;
    return _this;
  }

  _createClass(Filter, [{
    key: 'resetFilteredState',
    value: function resetFilteredState() {
      return {
        data: _specialitiesTools2.default.initCheckedState
      };
    }
  }, {
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
      this.setState({ location: this.state.location });
    }
  }, {
    key: 'clearFilters',
    value: function clearFilters(e) {
      e.preventDefault();
      console.log("clear Filters");
      this.setState({ data: _specialitiesTools2.default.initCheckedState });
    }
  }, {
    key: 'toggleFilter',
    value: function toggleFilter() {
      this.setState({ open: !this.state.open });
    }
  }, {
    key: 'submitFilters',
    value: function submitFilters(e) {
      e.preventDefault();
      var specialities = this.state.data.filter(function (d) {
        return d.selected;
      }).map(function (d) {
        return _specialitiesTools2.default.idToString[d.id];
      });

      console.log(specialities);
      var that = this;
      _exploreActions2.default.setFilters(specialities, function () {
        that.setState({ message: data.message });
      });
    }
  }, {
    key: '_changeSelection',
    value: function _changeSelection(id) {
      var state = this.state.data.map(function (d) {
        return {
          id: d.id,
          selected: d.id === id ? !d.selected : d.selected
        };
      });
      this.setState({ data: state });
    }
  }, {
    key: 'render',
    value: function render() {
      var isOpen = this.state.open;
      if (isOpen) {
        var divStyle = {
          display: 'block'
        };
      } else {
        var divStyle = {
          display: "none"
        };
      }

      var that = this;

      var checks = _specialitiesTools2.default.getCheckBoxes(this.state.data, function (data_id) {
        return that._changeSelection.bind(that, data_id);
      });

      var checkGroups = [];
      for (var i = 0; i < checks.length; i += 3) {
        checkGroups.push(_react2.default.createElement(
          'div',
          { key: i, className: 'large-3 columns' },
          checks[i],
          checks[i + 1],
          checks[i + 2]
        ));
      }

      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'columns' },
          _react2.default.createElement(
            'ul',
            { className: 'accordion' },
            _react2.default.createElement(
              'li',
              { className: "accordion-item " + (isOpen ? "is-active" : "") },
              _react2.default.createElement(
                'a',
                { onClick: this.toggleFilter, role: 'tab', className: 'accordion-title', id: 'filter-heading', 'aria-controls': 'filter', 'aria-expanded': isOpen, 'aria-selected': isOpen },
                'Filters'
              ),
              _react2.default.createElement(
                'div',
                { id: 'filter', className: 'accordion-content', role: 'tabpanel', 'data-tab-content': true, 'aria-labelledby': 'filter-heading', 'aria-hidden': !isOpen, style: divStyle },
                _react2.default.createElement(
                  'form',
                  { id: 'filter-form', name: 'filter-form' },
                  _react2.default.createElement(
                    'fieldset',
                    { className: 'fieldset' },
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Specialties:'
                    ),
                    checkGroups
                  ),
                  _react2.default.createElement('input', { type: 'submit', className: 'button', value: 'Apply', onClick: this.submitFilters }),
                  ' ',
                  _react2.default.createElement('input', { type: 'submit', className: 'hollow button', value: 'Clear All', onClick: this.clearFilters })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Filter;
}(_react2.default.Component);

exports.default = Filter;

},{"../../actions/exploreActions":1,"../../stores/exploreStore":40,"../../utils/specialitiesTools":45,"react":"react","react-dom":"react-dom"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    return _possibleConstructorReturn(this, (profileCard.__proto__ || Object.getPrototypeOf(profileCard)).call(this));
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
      var profileLink = '/photographers/profile/' + id;
      var coverImageLink = photographer.coverUrl;
      var avatarImageLink = photographer.avatarUrl;
      var name = photographer.officialName;
      var location = photographer.locationString;

      var numReviews = photographer.numReviews;
      var numFavorites = photographer.favorites;

      var totalStars = 5;
      var rating = photographer.rating;

      var stars = [];
      for (var i = 1; i <= rating; i++) {
        stars.push(_react2.default.createElement('i', { key: i, className: 'fa fa-star' }));
      }
      if (rating - Math.floor(rating) >= 0.9) {
        stars.push(_react2.default.createElement('i', { key: rating, className: 'fa fa-star' }));
      } else if (rating - Math.floor(rating) >= 0.4) {
        stars.push(_react2.default.createElement('i', { key: rating, className: 'fa fa-star-half-o' }));
      } else if (rating - Math.floor(rating) > 0) {
        stars.push(_react2.default.createElement('i', { key: rating, className: 'fa fa-star-o' }));
      }
      for (var i = Math.ceil(rating) + 1; i <= totalStars; i++) {
        stars.push(_react2.default.createElement('i', { key: i, className: 'fa fa-star-o' }));
      }

      var specialities = photographer.specialities;
      var labels = [];
      for (var i = 0; i < photographer.specialities.length && i < 3; i++) {
        labels.push(_react2.default.createElement(
          'span',
          { key: i, className: 'label' },
          photographer.specialities[i]
        ));
      }
      if (specialities.length > 3) {
        labels.push(_react2.default.createElement(
          'span',
          { key: specialities.length, className: 'label' },
          '...'
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
              { className: 'avatar small' },
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
                '(',
                numReviews,
                ') · ',
                _react2.default.createElement('i', { className: 'fa fa-heart' }),
                ' (',
                numFavorites,
                ')'
              ),
              _react2.default.createElement(
                'div',
                { className: 'specialty' },
                labels
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

},{"../../actions/exploreActions":1,"../../stores/exploreStore":40,"react":"react","react-dom":"react-dom","react-router":"react-router"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
  return o;
}

function compareFavorites(a, b) {
  return b.favorites - a.favorites;
}

function compareRating(a, b) {
  // need better rating system
  return b.rating - a.rating;
}

function contains(specialities, filters) {
  for (var i = 0; i < filters.length; i++) {
    console.log(filters[i]);
    if (specialities.indexOf(filters[i]) === -1) {
      return false;
    }
  }
  return true;
}

var ProfileView = function (_React$Component) {
  _inherits(ProfileView, _React$Component);

  function ProfileView() {
    _classCallCheck(this, ProfileView);

    var _this = _possibleConstructorReturn(this, (ProfileView.__proto__ || Object.getPrototypeOf(ProfileView)).call(this));

    _this.state = _exploreStore2.default.setFullState();
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
      this.setState(_exploreStore2.default.setFullState());
    }
  }, {
    key: 'render',
    value: function render() {
      var profiles = this.state.profiles;
      if (this.state.sortBy === 'random') {
        profiles = shuffle(this.state.profiles);
      } else if (this.state.sortBy === 'favorite' && this.state.sortHasChanged) {
        profiles.sort(compareFavorites);
      } else if (this.state.sortBy === 'rating' && this.state.sortHasChanged) {
        profiles.sort(compareRating);
      }

      var that = this;
      var profileCards = profiles.map(function (p) {
        //if {this.state.filters in p.specialities}
        if (that.state.filters.length === 0 || contains(p.specialities, that.state.filters)) {
          return _react2.default.createElement(_profileCard2.default, _extends({ key: p._id }, that.props, { photographer: p }));
        }
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

},{"../../actions/exploreActions":1,"../../stores/exploreStore":40,"./profileCard":11,"react":"react","react-dom":"react-dom"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Sorter = function (_React$Component) {
  _inherits(Sorter, _React$Component);

  function Sorter() {
    _classCallCheck(this, Sorter);

    var _this = _possibleConstructorReturn(this, (Sorter.__proto__ || Object.getPrototypeOf(Sorter)).call(this));

    _this.state = _exploreStore2.default.getSortState();
    // this._onChange = this._onChange.bind(this);
    _this.sortBy = _this.sortBy.bind(_this);
    return _this;
  }

  _createClass(Sorter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      _exploreStore2.default.addChangeListener(this.changeListener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _exploreStore2.default.removeChangeListener(this.changeListener);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_exploreStore2.default.getSortState());
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'sortBy',
    value: function sortBy(e) {
      _exploreActions2.default.setSort(e.target.getAttribute('data-value'));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row sorting' },
        _react2.default.createElement('div', { className: 'medium-6 columns' }),
        _react2.default.createElement(
          'div',
          { className: 'medium-6 columns' },
          _react2.default.createElement(
            'p',
            { className: 'text-right' },
            'Sort by: ',
            _react2.default.createElement(
              'a',
              { 'data-value': 'rate', onClick: this.sortBy },
              'Top Rated'
            ),
            ' | ',
            _react2.default.createElement(
              'a',
              { 'data-value': 'favorite', onClick: this.sortBy },
              'Most Favorited'
            ),
            ' | ',
            _react2.default.createElement(
              'a',
              { 'data-value': 'random', onClick: this.sortBy },
              'Random'
            )
          )
        )
      );
    }
  }]);

  return Sorter;
}(_react2.default.Component);

exports.default = Sorter;

// ReactMixin(Login.prototype, React.addons.LinkedStateMixin);

},{"../../actions/exploreActions":1,"../../stores/exploreStore":40,"react":"react","react-dom":"react-dom"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

    console.log("here in Home");
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.userLoggedIn) {
        _reactRouter.browserHistory.push('/home');
      }
    }
  }, {
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
            _reactRouter.Link,
            { to: this.props.userLoggedIn ? '/home' : '/signup', className: 'primary button' },
            'Get Started'
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
            'h3',
            null,
            'Want to be a photographer on Captura?',
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/photographers', className: 'hollow button' },
              'Learn More'
            )
          )
        )
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = (0, _authenticatedComponent2.default)(Home);

},{"./authenticatedComponent":7,"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this));

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
        null,
        _react2.default.createElement(
          'div',
          { className: 'callout small hero' },
          _react2.default.createElement(
            'h1',
            null,
            'Log In'
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'login', className: 'callout medium photographer-login' },
          this.state.message ? _react2.default.createElement(
            'div',
            { className: 'callout alert' },
            _react2.default.createElement(
              'p',
              null,
              this.state.message
            )
          ) : null,
          _react2.default.createElement(
            'form',
            { id: 'login-form', name: 'login-form', onSubmit: this.login },
            _react2.default.createElement('input', { type: 'text', ref: 'focus', onChange: this.handleEmailChange, value: this.state.email, name: 'email', id: 'email', placeholder: 'Email Address' }),
            _react2.default.createElement('input', { type: 'password', onChange: this.handlePwdChange, value: this.state.password, name: 'password', id: 'password', ref: 'password', placeholder: 'Password' }),
            _react2.default.createElement('input', { type: 'submit', value: 'Log In', className: 'expanded button' })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            null,
            'Don',
            '\'',
            't have an account yet? ',
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/signup' },
              'Sign Up'
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = Login;

},{"../../actions/sessionActions":4,"react":"react","react-dom":"react-dom","react-router":"react-router"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this));

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
      console.log("in Navbar: ", this.state.user);
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
      if (!_sessionStore2.default.isLoggedIn()) {
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
                _react2.default.createElement('i', { className: 'fa fa-lock' }),
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
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/photographers' },
                'Become a Photographer'
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
                { onClick: this.logout },
                'Logout'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/users/' + this.state.user._id },
                ' ',
                _react2.default.createElement('i', { className: 'fa fa-lock' }),
                this.state.user.firstName
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

},{"../../actions/sessionActions":4,"../../stores/sessionStore":42,"react":"react","react-router":"react-router"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sessionActions = require('../../actions/sessionActions');

var _sessionActions2 = _interopRequireDefault(_sessionActions);

var _userActions = require('../../actions/userActions');

var _userActions2 = _interopRequireDefault(_userActions);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Signup = function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup() {
    _classCallCheck(this, Signup);

    var _this = _possibleConstructorReturn(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this));

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

        _userActions2.default.signup(signupData, function (data) {
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
        null,
        _react2.default.createElement(
          'div',
          { className: 'callout small hero' },
          _react2.default.createElement(
            'h1',
            null,
            'Sign Up'
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'login', className: 'callout medium photographer-login' },
          this.state.message ? _react2.default.createElement(
            'div',
            { className: 'callout alert' },
            _react2.default.createElement(
              'p',
              null,
              this.state.message
            )
          ) : null,
          _react2.default.createElement(
            'p',
            null,
            'Want to sign up as a photographer? ',
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/apply' },
              'Apply Here'
            )
          ),
          _react2.default.createElement(
            'form',
            { id: 'signup-form', name: 'signup-form', onSubmit: this.signup },
            _react2.default.createElement('input', { type: 'text', ref: 'firstName', name: 'firstname', id: 'firstname', placeholder: 'First name' }),
            _react2.default.createElement('input', { type: 'text', ref: 'lastName', name: 'lastname', id: 'lastname', placeholder: 'Last name' }),
            _react2.default.createElement('input', { type: 'text', ref: 'email', name: 'email', id: 'email', placeholder: 'Email address' }),
            _react2.default.createElement('input', { type: 'password', ref: 'password', name: 'password', id: 'password', placeholder: 'Password' }),
            _react2.default.createElement('input', { type: 'password', ref: 'confirm', name: 'password', id: 'password', placeholder: 'Confirm Password' }),
            _react2.default.createElement('input', { type: 'submit', value: 'Sign Up', className: 'expanded button' })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'p',
            null,
            'Already have an account? ',
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/login' },
              'Log in'
            )
          )
        )
      );
    }
  }]);

  return Signup;
}(_react2.default.Component);

exports.default = Signup;

},{"../../actions/sessionActions":4,"../../actions/userActions":5,"react":"react","react-dom":"react-dom","react-router":"react-router"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _specialitiesTools = require('../../utils/specialitiesTools');

var _specialitiesTools2 = _interopRequireDefault(_specialitiesTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountInfo = function (_React$Component) {
  _inherits(AccountInfo, _React$Component);

  function AccountInfo() {
    _classCallCheck(this, AccountInfo);

    var _this = _possibleConstructorReturn(this, (AccountInfo.__proto__ || Object.getPrototypeOf(AccountInfo)).call(this));

    _this.state = _this.resetState();
    _this.signup = _this.signup.bind(_this);
    _this.useBusinessCheck = _this.useBusinessCheck.bind(_this);
    return _this;
  }

  _createClass(AccountInfo, [{
    key: 'resetState',
    value: function resetState() {
      return {
        useBusiness: false,
        message: '',
        data: _specialitiesTools2.default.initCheckedState
      };
    }
  }, {
    key: 'useBusinessCheck',
    value: function useBusinessCheck(e) {
      this.setState({ "useBusiness": !this.state.useBusiness });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _reactDom2.default.findDOMNode(this.refs.email).focus();
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'signup',
    value: function signup(e) {
      e.preventDefault();
      var loc = this.refs.location.value.split(',');
      if (this.refs.password.value !== this.refs.confirm.value) {
        this.setState({ message: "Passwords don't match", password: '', confirm: '' });
        _reactDom2.default.findDOMNode(this.refs.password).focus();
      } else if (this.state.useBusiness === true && this.refs.businessName.value === '') {
        this.setState({ message: "You selected to use a business name. Please provide one." });
        _reactDom2.default.findDOMNode(this.refs.businessName).focus();
      } else if (loc.length !== 2) {
        this.setState({ message: "Location must be of format: City, State" });
        _reactDom2.default.findDOMNode(this.refs.location).focus();
      } else {
        var city = loc[0].trim();
        var state = loc[1].trim();

        var loc = this.refs.location.value.split(',');
        var specialities = this.state.data.filter(function (d) {
          return d.selected;
        }).map(function (d) {
          return _specialitiesTools2.default.idToString[d.id];
        });
        console.log(specialities);
        var applyData = {
          firstName: this.refs.firstName.value,
          lastName: this.refs.lastName.value,
          businessName: this.refs.businessName.value,
          useBusiness: this.state.useBusiness,
          email: this.refs.email.value,
          password: this.refs.password.value,
          city: city,
          state: state,
          specialities: specialities,
          portfolio: this.refs.portfolio.value
        };
        var that = this;
        SessionActions.applyFor(applyData, function (data) {
          that.setState({ message: data.message });
        });
      }
    }
  }, {
    key: '_changeSelection',
    value: function _changeSelection(id) {
      var state = this.state.data.map(function (d) {
        return {
          id: d.id,
          selected: d.id === id ? !d.selected : d.selected
        };
      });
      this.setState({ data: state });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.state);
      var that = this;

      var checks = _specialitiesTools2.default.getCheckBoxes(this.state.data, function (data_id) {
        return that._changeSelection.bind(that, data_id);
      });

      var checkGroups = [];
      for (var i = 0; i < checks.length; i += 3) {
        checkGroups.push(_react2.default.createElement(
          'div',
          { className: 'large-3 columns' },
          checks[i],
          checks[i + 1],
          checks[i + 2]
        ));
      }

      return _react2.default.createElement(
        'div',
        { className: 'row section' },
        _react2.default.createElement(
          'div',
          { className: 'medium-3 columns' },
          _react2.default.createElement(
            'ul',
            { className: 'tabs vertical', id: 'account-tabs', 'data-tabs': true },
            _react2.default.createElement(
              'li',
              { className: 'tabs-title is-active' },
              _react2.default.createElement(
                'a',
                { href: '#bookings', 'aria-selected': 'true' },
                'My Bookings'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'tabs-title' },
              _react2.default.createElement(
                'a',
                { href: '#edit' },
                'Edit Info'
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'medium-9 columns' },
          _react2.default.createElement(
            'div',
            { className: 'tabs-content vertical', 'data-tabs-content': 'example-vert-tabs' },
            _react2.default.createElement(
              'div',
              { className: 'tabs-panel is-active', id: 'bookings' },
              _react2.default.createElement(
                'h3',
                null,
                'My Bookings'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'tabs-panel', id: 'edit' },
              _react2.default.createElement(
                'h3',
                null,
                'Edit Account Information'
              ),
              _react2.default.createElement(
                'div',
                { className: 'callout success' },
                _react2.default.createElement(
                  'p',
                  null,
                  'You',
                  '\'',
                  've successfully updated your profile! You can ',
                  _react2.default.createElement(
                    'a',
                    { href: '#' },
                    'view it here'
                  ),
                  '.'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'callout alert' },
                _react2.default.createElement(
                  'p',
                  null,
                  'Oh no! Something went wrong!'
                )
              ),
              _react2.default.createElement(
                'form',
                { id: 'photog-edit-profile-form', name: 'edit-profile-form', action: '#' },
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'large-6 columns' },
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Profile Picture'
                    ),
                    _react2.default.createElement('input', { type: 'submit', value: 'Upload', className: 'button' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'large-6 columns' },
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Cover Photo'
                    ),
                    _react2.default.createElement('input', { type: 'submit', value: 'Upload', className: 'button' })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement(
                      'legend',
                      null,
                      'First Name'
                    ),
                    _react2.default.createElement('input', { type: 'text', name: 'firstname', id: 'firstname', placeholder: 'First name', value: 'John' }),
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Last Name'
                    ),
                    _react2.default.createElement('input', { type: 'text', name: 'lastname', id: 'lastname', placeholder: 'Last name', value: 'Smith' }),
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Business Name (Optional)'
                    ),
                    _react2.default.createElement('input', { type: 'text', name: 'lastname', id: 'bizname', placeholder: 'Business name (optional)' }),
                    _react2.default.createElement('input', { id: 'usebizname', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'usebizname' },
                      'Use business name on Captura'
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-text', id: 'usebiznameHelpText' },
                      'This means your business name appear in place of your full name.'
                    ),
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Location'
                    ),
                    _react2.default.createElement('input', { type: 'text', name: 'location', id: 'location', placeholder: 'Location (City, State)', value: 'San Francisco, CA' }),
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Email Address'
                    ),
                    _react2.default.createElement('input', { type: 'email', name: 'email', id: 'email', placeholder: 'Email address', value: 'me@johnsmithphotography.com' }),
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Change Password'
                    ),
                    _react2.default.createElement('input', { type: 'password', name: 'password', id: 'password', placeholder: 'Old Password' }),
                    _react2.default.createElement('input', { type: 'password', name: 'password', id: 'password', placeholder: 'New Password' }),
                    _react2.default.createElement('input', { type: 'password', name: 'password', id: 'password', placeholder: 'Confirm New Password' })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Link to Portfolio'
                    ),
                    _react2.default.createElement('input', { type: 'url', name: 'portfolio', id: 'portfolio', placeholder: 'Portfolio URL', value: 'http://johnsmithphotography.com' }),
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Link to Facebook Page (Optional)'
                    ),
                    _react2.default.createElement('input', { type: 'url', name: 'facebook', id: 'facebook', placeholder: 'Facebook Page URL (Optional)' }),
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Link to Instagram (Optional)'
                    ),
                    _react2.default.createElement('input', { type: 'url', name: 'instagram', id: 'instagram', placeholder: 'Instagram Profile URL (Optional)' }),
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Link to Flickr (Optional)'
                    ),
                    _react2.default.createElement('input', { type: 'url', name: 'flickr', id: 'flickr', placeholder: 'Flickr Profile URL (Optional)' })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row about' },
                  _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement(
                      'legend',
                      null,
                      'About Me (Optional)'
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-text', id: 'specialtyHelpText' },
                      'Limited to 4000 characters.'
                    ),
                    _react2.default.createElement('textarea', { name: 'about', id: 'about', form: 'photog-edit-profile-form', rows: '4', placeholder: 'Write something about yourself and your work (Optional)', maxlength: '4000' })
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement(
                      'legend',
                      null,
                      'Specialties'
                    ),
                    _react2.default.createElement(
                      'p',
                      { className: 'help-text', id: 'specialtyHelpText' },
                      'Select at least one.'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'large-6 columns' },
                    _react2.default.createElement('input', { id: 'portrait', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'portrait' },
                      'Portrait'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'headshot', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'headshot' },
                      'Headshot'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'events', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'events' },
                      'Events'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'engagement', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'engagement' },
                      'Engagement'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'wedding', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'wedding' },
                      'Wedding'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'lifestyle', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'lifestyle' },
                      'Lifestyle/Candid'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'large-6 columns' },
                    _react2.default.createElement('input', { id: 'club', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'club' },
                      'Club/Nightlife'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'concert', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'concert' },
                      'Concert/Performance'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'commercial', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'commercial' },
                      'Commercial'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'arch', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'arch' },
                      'Real Estate/Architecture'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'sports', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'sports' },
                      'Sports'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', { id: 'nature', type: 'checkbox' }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'nature' },
                      'Nature'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row section' },
                  _react2.default.createElement(
                    'div',
                    { className: 'columns' },
                    _react2.default.createElement('input', { type: 'submit', value: 'Save', className: 'button' }),
                    ' ',
                    _react2.default.createElement('input', { type: 'submit', value: 'Cancel', className: 'hollow button' })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AccountInfo;
}(_react2.default.Component);

exports.default = AccountInfo;

//     <div>
//   <div className="callout hero small photographer">
//     <h3>Capture for Captura</h3>
//     <p>Apply to be a photographer</p>
//   </div>
//   <form id="apply-form" name="apply-form" action="#" onSubmit={this.signup}>

//     <div className="row section">
//             {this.state.message ?
//     <div scrollIntoView={true} className="callout alert">
//       <p>{this.state.message}</p>
//     </div> : null}
//       <div className="columns">
//         <legend>Account Information:</legend>
//         <input type="email" ref="email" name="email" id="email" placeholder="Email address" required/>
//         <input type="password" ref="password" name="password" id="password" placeholder="Password" required/>
//         <input type="password" ref="confirm" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />
//       </div>
//     </div>
//     <div className="row">
//       <div className="columns">
//         <legend>Personal Information:</legend>
//         <input type="text" ref="firstName" name="firstname" id="firstname" placeholder="First name" required/>
//         <input type="text" ref="lastName" name="lastname" id="lastname" placeholder="Last name" required/>
//         <input type="text" ref="businessName" name="businesName" id="bizname" placeholder="Business name (optional)" />
//         <input checked={this.state.useBusiness} onChange={this.useBusinessCheck} id="usebizname" type="checkbox"/><label htmlhtmlFor="usebizname">Use business name on Captura</label>
//         <p className="help-text" id="usebiznameHelpText">This means your business name appear in place of your full name.</p>
//         <input type="text" ref="location" name="location" id="location" placeholder="Location (City, State)" required/>
//         <p className="help-text" id="locationHelpText">Where are you based? Please enter in this format: City, State (e.g. Boston, MA) </p>
//         <input type="url" ref="portfolio" name="portfolio" id="portfolio" placeholder="Portfolio URL" required/>
//         <p className="help-text" id="portfolioHelpText">To ensure quality experience for our clients, we need your portfolio to verify your work.</p>
//       </div>
//     </div>
//     <div className="row">
//       <div className="columns">
//         <legend>specialities</legend>
//         <p className="help-text" id="specialtyHelpText">Select at least one.</p>
//       </div>
//     </div>
//     <div className="row">
//     {checkGroups}
//     </div>
//     <div className="row section">
//       <div className="columns">
//         <p className="help-text" id="applyHelpText">After you submit, our team will review your application and notify you once your application has been approved. Once approved, you will be able to further customize your Captura profile to best showcase your skills and interests. Then, you{'\u0027'}re ready to be booked!</p>
//         <input type="submit" value="Submit Application" className="button" />
//       </div>
//     </div>
//   </form>
// </div>

},{"../../utils/specialitiesTools":45,"react":"react","react-dom":"react-dom","react-dropzone":52,"react-router":"react-router"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _photographerActions = require('../../actions/photographerActions');

var _photographerActions2 = _interopRequireDefault(_photographerActions);

var _reactRouter = require('react-router');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _specialitiesTools = require('../../utils/specialitiesTools');

var _specialitiesTools2 = _interopRequireDefault(_specialitiesTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Apply = function (_React$Component) {
  _inherits(Apply, _React$Component);

  function Apply() {
    _classCallCheck(this, Apply);

    var _this = _possibleConstructorReturn(this, (Apply.__proto__ || Object.getPrototypeOf(Apply)).call(this));

    _this.state = _this.resetState();
    _this.signup = _this.signup.bind(_this);
    _this.useBusinessCheck = _this.useBusinessCheck.bind(_this);
    return _this;
  }

  _createClass(Apply, [{
    key: 'resetState',
    value: function resetState() {
      return {
        useBusiness: false,
        message: '',
        data: _specialitiesTools2.default.initCheckedState
      };
    }
  }, {
    key: 'useBusinessCheck',
    value: function useBusinessCheck(e) {
      this.setState({ "useBusiness": !this.state.useBusiness });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _reactDom2.default.findDOMNode(this.refs.email).focus();
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'signup',
    value: function signup(e) {
      e.preventDefault();
      var loc = this.refs.location.value.split(',');
      if (this.refs.password.value !== this.refs.confirm.value) {
        this.setState({ message: "Passwords don't match", password: '', confirm: '' });
        _reactDom2.default.findDOMNode(this.refs.password).focus();
      } else if (this.state.useBusiness === true && this.refs.businessName.value === '') {
        this.setState({ message: "You selected to use a business name. Please provide one." });
        _reactDom2.default.findDOMNode(this.refs.businessName).focus();
      } else if (loc.length !== 2) {
        this.setState({ message: "Location must be of format: City, State" });
        _reactDom2.default.findDOMNode(this.refs.location).focus();
      } else {
        var city = loc[0].trim();
        var state = loc[1].trim();

        var loc = this.refs.location.value.split(',');
        var specialities = this.state.data.filter(function (d) {
          return d.selected;
        }).map(function (d) {
          return _specialitiesTools2.default.idToString[d.id];
        });
        console.log(specialities);
        var applyData = {
          firstName: this.refs.firstName.value,
          lastName: this.refs.lastName.value,
          businessName: this.refs.businessName.value,
          useBusiness: this.state.useBusiness,
          email: this.refs.email.value,
          password: this.refs.password.value,
          city: city,
          state: state,
          specialities: specialities,
          portfolio: this.refs.portfolio.value
        };
        var that = this;
        _photographerActions2.default.applyFor(applyData, function (data) {
          that.setState({ message: data.message });
        });
      }
    }
  }, {
    key: '_changeSelection',
    value: function _changeSelection(id) {
      var state = this.state.data.map(function (d) {
        return {
          id: d.id,
          selected: d.id === id ? !d.selected : d.selected
        };
      });
      this.setState({ data: state });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.state);
      var that = this;

      var checks = _specialitiesTools2.default.getCheckBoxes(this.state.data, function (data_id) {
        return that._changeSelection.bind(that, data_id);
      });

      var checkGroups = [];
      for (var i = 0; i < checks.length; i += 3) {
        checkGroups.push(_react2.default.createElement(
          'div',
          { key: i, className: 'large-3 columns' },
          checks[i],
          checks[i + 1],
          checks[i + 2]
        ));
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'callout hero small photographer' },
          _react2.default.createElement(
            'h3',
            null,
            'Capture for Captura'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Apply to be a photographer'
          )
        ),
        _react2.default.createElement(
          'form',
          { id: 'apply-form', name: 'apply-form', action: '#', onSubmit: this.signup },
          _react2.default.createElement(
            'div',
            { className: 'row section' },
            this.state.message ? _react2.default.createElement(
              'div',
              { scrollIntoView: true, className: 'callout alert' },
              _react2.default.createElement(
                'p',
                null,
                this.state.message
              )
            ) : null,
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement(
                'legend',
                null,
                'Account Information:'
              ),
              _react2.default.createElement('input', { type: 'email', ref: 'email', name: 'email', id: 'email', placeholder: 'Email address', required: true }),
              _react2.default.createElement('input', { type: 'password', ref: 'password', name: 'password', id: 'password', placeholder: 'Password', required: true }),
              _react2.default.createElement('input', { type: 'password', ref: 'confirm', name: 'confirm-password', id: 'confirm-password', placeholder: 'Confirm Password' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement(
                'legend',
                null,
                'Personal Information:'
              ),
              _react2.default.createElement('input', { type: 'text', ref: 'firstName', name: 'firstname', id: 'firstname', placeholder: 'First name', required: true }),
              _react2.default.createElement('input', { type: 'text', ref: 'lastName', name: 'lastname', id: 'lastname', placeholder: 'Last name', required: true }),
              _react2.default.createElement('input', { type: 'text', ref: 'businessName', name: 'businesName', id: 'bizname', placeholder: 'Business name (optional)' }),
              _react2.default.createElement('input', { checked: this.state.useBusiness, onChange: this.useBusinessCheck, id: 'usebizname', type: 'checkbox' }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'usebizname' },
                'Use business name on Captura'
              ),
              _react2.default.createElement(
                'p',
                { className: 'help-text', id: 'usebiznameHelpText' },
                'This means your business name appear in place of your full name.'
              ),
              _react2.default.createElement('input', { type: 'text', ref: 'location', name: 'location', id: 'location', placeholder: 'Location (City, State)', required: true }),
              _react2.default.createElement(
                'p',
                { className: 'help-text', id: 'locationHelpText' },
                'Where are you based? Please enter in this format: City, State (e.g. Boston, MA) '
              ),
              _react2.default.createElement('input', { type: 'url', ref: 'portfolio', name: 'portfolio', id: 'portfolio', placeholder: 'Portfolio URL', required: true }),
              _react2.default.createElement(
                'p',
                { className: 'help-text', id: 'portfolioHelpText' },
                'To ensure quality experience for our clients, we need your portfolio to verify your work.'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement(
                'legend',
                null,
                'specialities'
              ),
              _react2.default.createElement(
                'p',
                { className: 'help-text', id: 'specialtyHelpText' },
                'Select at least one.'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            checkGroups
          ),
          _react2.default.createElement(
            'div',
            { className: 'row section' },
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement(
                'p',
                { className: 'help-text', id: 'applyHelpText' },
                'After you submit, our team will review your application and notify you once your application has been approved. Once approved, you will be able to further customize your Captura profile to best showcase your skills and interests. Then, you',
                '\'',
                're ready to be booked!'
              ),
              _react2.default.createElement('input', { type: 'submit', value: 'Submit Application', className: 'button' })
            )
          )
        )
      );
    }
  }]);

  return Apply;
}(_react2.default.Component);

exports.default = Apply;

},{"../../actions/photographerActions":2,"../../utils/specialitiesTools":45,"react":"react","react-dom":"react-dom","react-dropzone":52,"react-router":"react-router"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotographerHome = function (_React$Component) {
  _inherits(PhotographerHome, _React$Component);

  function PhotographerHome() {
    _classCallCheck(this, PhotographerHome);

    var _this = _possibleConstructorReturn(this, (PhotographerHome.__proto__ || Object.getPrototypeOf(PhotographerHome)).call(this));

    _this.submitForm = _this.submitForm.bind(_this);
    _this.state = { message: '' };
    return _this;
  }

  _createClass(PhotographerHome, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.userLoggedIn) {
        _reactRouter.browserHistory.push('/home');
      }
    }
  }, {
    key: 'submitForm',
    value: function submitForm(e) {
      e.preventDefault();
      this.setState({ message: "Invalid Credentials. If you've submitted an application, we'll get back to you soon!" });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'callout large hero photographer-main' },
          _react2.default.createElement(
            'h1',
            null,
            'Capture for ',
            _react2.default.createElement(
              'em',
              null,
              'Captura'
            )
          ),
          _react2.default.createElement(
            'h3',
            null,
            'Join our growing community of photographers from all over the country.'
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/apply', className: 'primary button' },
            'Apply Now'
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
              'Apply'
            ),
            _react2.default.createElement(
              'p',
              null,
              'The application is simple! We need to screen for qualified photographers to ensure quality experiences for clients.'
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
              'Complete Profile'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Once approved, you can get started with Captura by updating your profile to best showcase your skills and specialties.'
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
              'Get Booked!'
            ),
            _react2.default.createElement(
              'p',
              null,
              'That',
              '\'',
              's it! Once your profile is completed, you will show up on the "explore" page for clients to browse and book you to capture their moments.'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'login', className: 'callout medium photographer-login' },
          _react2.default.createElement(
            'h3',
            null,
            'Already have an account? Log In Here.'
          ),
          _react2.default.createElement('br', null),
          this.state.message ? _react2.default.createElement(
            'div',
            { className: 'callout alert' },
            _react2.default.createElement(
              'p',
              null,
              this.state.message
            )
          ) : null,
          _react2.default.createElement(
            'form',
            { id: 'login-form', name: 'login-form', onSubmit: this.submitForm },
            _react2.default.createElement('input', { type: 'text', name: 'email', id: 'email', placeholder: 'Email address' }),
            _react2.default.createElement('input', { type: 'password', name: 'password', id: 'password', placeholder: 'Password' }),
            _react2.default.createElement('input', { type: 'submit', value: 'Log In', className: 'expanded button' })
          )
        )
      );
    }
  }]);

  return PhotographerHome;
}(_react2.default.Component);

exports.default = PhotographerHome;

},{"react":"react","react-router":"react-router"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _profileActions = require('../../actions/profileActions');

var _profileActions2 = _interopRequireDefault(_profileActions);

var _profileStore = require('../../stores/profileStore');

var _profileStore2 = _interopRequireDefault(_profileStore);

var _profileTitle = require('./profileTitle');

var _profileTitle2 = _interopRequireDefault(_profileTitle);

var _profileContent = require('./profileContent');

var _profileContent2 = _interopRequireDefault(_profileContent);

var _authenticatedComponent = require('../authenticatedComponent');

var _authenticatedComponent2 = _interopRequireDefault(_authenticatedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotographerProfile = function (_React$Component) {
  _inherits(PhotographerProfile, _React$Component);

  function PhotographerProfile() {
    _classCallCheck(this, PhotographerProfile);

    var _this = _possibleConstructorReturn(this, (PhotographerProfile.__proto__ || Object.getPrototypeOf(PhotographerProfile)).call(this));

    _this.state = _profileStore2.default.getProfileState();
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(PhotographerProfile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log("Mounted PhotographerProfile");
      this.changeListener = this._onChange.bind(this);
      _profileStore2.default.addChangeListener(this.changeListener);
      _profileActions2.default.getPhotographerProfileInfo(this.props.params.id);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _profileStore2.default.clearState();
      _profileStore2.default.removeChangeListener(this.changeListener);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_profileStore2.default.getProfileState());
      console.log("updating profilestore");
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("profile: ", this.state);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'container cover' },
          _react2.default.createElement('img', { src: this.state.coverUrl })
        ),
        _react2.default.createElement(_profileTitle2.default, { id: this.state.id,
          avatarUrl: this.state.avatarUrl,
          officialName: this.state.officialName,
          numFavorites: this.state.numFavorites,
          rating: this.state.rating,
          numReviews: this.state.numReviews,
          locationString: this.state.locationString,
          favorited: this.state.favorited,
          portfolio: this.state.portfolio,
          facebook: this.state.facebook,
          flickr: this.state.flickr,
          instagram: this.state.instagram }),
        _react2.default.createElement(_profileContent2.default, { aboutMe: this.state.aboutMe,
          specialities: this.state.specialities,
          reviews: this.state.reviews })
      );
    }
  }]);

  return PhotographerProfile;
}(_react2.default.Component);

exports.default = (0, _authenticatedComponent2.default)(PhotographerProfile);

},{"../../actions/profileActions":3,"../../stores/profileStore":41,"../authenticatedComponent":7,"./profileContent":22,"./profileTitle":23,"react":"react","react-dom":"react-dom"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _profileActions = require('../../actions/profileActions');

var _profileActions2 = _interopRequireDefault(_profileActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotographerContent = function (_React$Component) {
  _inherits(PhotographerContent, _React$Component);

  function PhotographerContent() {
    _classCallCheck(this, PhotographerContent);

    return _possibleConstructorReturn(this, (PhotographerContent.__proto__ || Object.getPrototypeOf(PhotographerContent)).call(this));
  }

  _createClass(PhotographerContent, [{
    key: 'render',
    value: function render() {

      var totalStars = 5;

      var specialities = this.props.specialities;
      var labels = [];
      for (var i = 0; i < specialities.length; i++) {
        labels.push(_react2.default.createElement(
          'span',
          { key: i, className: 'label' },
          specialities[i]
        ));
      }
      var reviews = this.props.reviews;
      console.log(reviews);
      var reviewBoxes = [];
      for (var r = 0; r < reviews.length; r++) {
        var review = reviews[r];
        var rating = review.rating;
        rating = 3;

        var stars = [];
        for (var i = 1; i <= rating; i++) {
          stars.push(_react2.default.createElement('i', { key: i + r, className: 'fa fa-star' }));
        }
        if (rating - Math.floor(rating) >= 0.9) {
          stars.push(_react2.default.createElement('i', { key: rating + r + 1, className: 'fa fa-star' }));
        } else if (rating - Math.floor(rating) >= 0.4) {
          stars.push(_react2.default.createElement('i', { key: rating + r + 2, className: 'fa fa-star-half-o' }));
        } else if (rating - Math.floor(rating) > 0) {
          stars.push(_react2.default.createElement('i', { key: rating + r + 3, className: 'fa fa-star-o' }));
        }
        for (var i = Math.ceil(rating) + 1; i <= totalStars; i++) {
          stars.push(_react2.default.createElement('i', { key: i + r, className: 'fa fa-star-o' }));
        }

        reviewBoxes.push(_react2.default.createElement(
          'div',
          { key: r + "reviews", className: 'review' },
          _react2.default.createElement(
            'div',
            { className: 'review-avatar small' },
            _react2.default.createElement('img', { src: review.writer.avatarUrl }),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'b',
                null,
                review.writer.firstLastInitial
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'span',
                { className: 'rating' },
                stars
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'review-text' },
            _react2.default.createElement(
              'p',
              null,
              review.content
            )
          ),
          _react2.default.createElement('hr', null)
        ));
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row section' },
          _react2.default.createElement(
            'div',
            { className: 'medium-8 columns' },
            _react2.default.createElement(
              'div',
              { className: 'profile-info' },
              _react2.default.createElement(
                'div',
                { id: 'about' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'About This Photographer'
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  this.props.aboutMe
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'specialty clickable' },
                _react2.default.createElement('hr', null),
                _react2.default.createElement(
                  'h4',
                  null,
                  'Specialties'
                ),
                labels
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row', id: 'reviews' },
          _react2.default.createElement(
            'div',
            { className: 'medium-8 columns' },
            _react2.default.createElement(
              'div',
              { className: 'profile-info' },
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'h4',
                null,
                'Reviews'
              ),
              reviewBoxes,
              _react2.default.createElement('hr', null)
            )
          )
        )
      );
    }
  }]);

  return PhotographerContent;
}(_react2.default.Component);

exports.default = PhotographerContent;

},{"../../actions/profileActions":3,"react":"react","react-dom":"react-dom"}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _profileActions = require('../../actions/profileActions');

var _profileActions2 = _interopRequireDefault(_profileActions);

var _reactRouter = require('react-router');

var _sessionStore = require('../../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotographerTitle = function (_React$Component) {
  _inherits(PhotographerTitle, _React$Component);

  function PhotographerTitle() {
    _classCallCheck(this, PhotographerTitle);

    var _this = _possibleConstructorReturn(this, (PhotographerTitle.__proto__ || Object.getPrototypeOf(PhotographerTitle)).call(this));

    _this.state = _sessionStore2.default.getState();
    _this.favorite = _this.favorite.bind(_this);
    return _this;
  }

  _createClass(PhotographerTitle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      _sessionStore2.default.addChangeListener(this.changeListener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _sessionStore2.default.removeChangeListener(this.changeListener);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_sessionStore2.default.getState());
    }
  }, {
    key: 'favorite',
    value: function favorite(e) {
      e.preventDefault();
      console.log(this.props);
      _profileActions2.default.sendFavorite(this.props.id);
    }
  }, {
    key: 'unFavorite',
    value: function unFavorite(e) {
      e.preventDefault();
      console.log("calling unfavorite");
      _profileActions2.default.unFavorite(this.props.id);
    }
  }, {
    key: 'render',
    value: function render() {
      var totalStars = 5;
      var rating = this.props.rating;
      console.log("in title: ", rating);
      // rating = 4.3

      var stars = [];
      for (var i = 1; i <= rating; i++) {
        stars.push(_react2.default.createElement('i', { key: i, className: 'fa fa-star' }));
      }
      if (rating - Math.floor(rating) >= 0.9) {
        stars.push(_react2.default.createElement('i', { key: rating, className: 'fa fa-star' }));
      } else if (rating - Math.floor(rating) >= 0.4) {
        stars.push(_react2.default.createElement('i', { key: rating, className: 'fa fa-star-half-o' }));
      } else if (rating - Math.floor(rating) > 0) {
        stars.push(_react2.default.createElement('i', { key: rating, className: 'fa fa-star-o' }));
      }
      for (var i = Math.ceil(rating) + 1; i <= totalStars; i++) {
        stars.push(_react2.default.createElement('i', { key: i, className: 'fa fa-star-o' }));
      }

      if (this.state.user) {
        var favorites = this.state.user.favorites;
        var id = this.props.id;
        var favorited = true;

        console.log("state: ", this.state);
        console.log("favorites: ", favorites);
        if (favorites.indexOf(id) === -1) {
          favorited = false;
        }
      }

      // if (SessionStore.)

      var externalLinks = [];

      return _react2.default.createElement(
        'div',
        { className: 'callout profile' },
        _react2.default.createElement(
          'div',
          { className: 'row section' },
          _react2.default.createElement(
            'div',
            { className: 'medium-8 columns' },
            _react2.default.createElement(
              'div',
              { className: 'profile-top' },
              _react2.default.createElement(
                'div',
                { className: 'avatar' },
                _react2.default.createElement('img', { src: this.props.avatarUrl })
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'h3',
                  null,
                  this.props.officialName
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement('i', { className: 'fa fa-map-marker' }),
                  '  ',
                  this.props.locationString,
                  ' ·',
                  _react2.default.createElement(
                    'a',
                    { href: '#ratings', className: 'rating' },
                    stars,
                    '(',
                    this.props.numReviews,
                    ')'
                  ),
                  ' · ',
                  _react2.default.createElement('i', { className: 'fa fa-heart' }),
                  ' (',
                  this.props.numFavorites,
                  ')'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'social' },
                  _react2.default.createElement(
                    'p',
                    null,
                    ' ',
                    this.props.portfolio ? _react2.default.createElement(
                      'a',
                      { href: this.props.portfolio, target: '_blank' },
                      _react2.default.createElement('i', { className: 'fa fa-globe' }),
                      '  '
                    ) : null,
                    this.props.facebook ? _react2.default.createElement(
                      'a',
                      { href: this.props.facebook, target: '_blank' },
                      _react2.default.createElement('i', { className: 'fa fa-facebook-official' }),
                      '  '
                    ) : null,
                    this.props.flickr ? _react2.default.createElement(
                      'a',
                      { href: this.props.flickr, target: '_blank' },
                      _react2.default.createElement('i', { className: 'fa fa-flickr' }),
                      '  '
                    ) : null,
                    this.props.instagram ? _react2.default.createElement(
                      'a',
                      { href: this.props.instagram, target: '_blank' },
                      _react2.default.createElement('i', { className: 'fa fa-instagram' })
                    ) : null
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'medium-4 columns' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/request', className: 'expanded button' },
              'Request Quote'
            ),
            favorited ? _react2.default.createElement(
              'a',
              { className: 'expanded alert button', onClick: this.unFavorite.bind(this) },
              _react2.default.createElement('i', { className: 'fa fa-heart' }),
              ' Favorited'
            ) : _react2.default.createElement(
              'a',
              { className: 'expanded hollow button', onClick: this.favorite },
              _react2.default.createElement('i', { className: 'fa fa-heart-o' }),
              ' Favorite'
            )
          )
        )
      );
    }
  }]);

  return PhotographerTitle;
}(_react2.default.Component);

exports.default = PhotographerTitle;

},{"../../actions/profileActions":3,"../../stores/sessionStore":42,"react":"react","react-dom":"react-dom","react-router":"react-router"}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _photographerActions = require('../../actions/photographerActions');

var _photographerActions2 = _interopRequireDefault(_photographerActions);

var _reactRouter = require('react-router');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _sessionStore = require('../../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuoteRequest = function (_React$Component) {
  _inherits(QuoteRequest, _React$Component);

  function QuoteRequest() {
    _classCallCheck(this, QuoteRequest);

    var _this = _possibleConstructorReturn(this, (QuoteRequest.__proto__ || Object.getPrototypeOf(QuoteRequest)).call(this));

    _this.state = _this.resetState();
    _this.requestQuote = _this.requestQuote.bind(_this);
    _this.useBusinessCheck = _this.useBusinessCheck.bind(_this);
    return _this;
  }

  _createClass(QuoteRequest, [{
    key: 'resetState',
    value: function resetState() {
      return {
        user: _sessionStore2.default.user
      };
    }
  }, {
    key: 'useBusinessCheck',
    value: function useBusinessCheck(e) {
      this.setState({ "useBusiness": !this.state.useBusiness });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _reactDom2.default.findDOMNode(this.refs.email).focus();
    }

    // This will be called when the user clicks on the login button

  }, {
    key: 'requestQuote',
    value: function requestQuote(e) {
      e.preventDefault();
    }
  }, {
    key: '_changeSelection',
    value: function _changeSelection(id) {
      var state = this.state.data.map(function (d) {
        return {
          id: d.id,
          selected: d.id === id ? !d.selected : d.selected
        };
      });
      this.setState({ data: state });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'callout hero small photographer' },
          _react2.default.createElement(
            'h3',
            null,
            'Request A Quote'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Fill out your event details below.'
          )
        ),
        _react2.default.createElement(
          'form',
          { id: 'request-form', name: 'request-form', action: '#' },
          _react2.default.createElement(
            'div',
            { className: 'row section' },
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement(
                'legend',
                null,
                'Request to:'
              ),
              _react2.default.createElement('input', { type: 'text', placeholder: 'Photographer', value: this.state.photographer, disabled: true }),
              _react2.default.createElement(
                'legend',
                null,
                'Date & Time:'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'medium-4 columns' },
              _react2.default.createElement(
                'label',
                null,
                'Date',
                _react2.default.createElement('input', { type: 'date', ref: 'date' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'medium-4 columns' },
              _react2.default.createElement(
                'label',
                null,
                'Time',
                _react2.default.createElement('input', { type: 'time', ref: 'time' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'medium-4 columns' },
              _react2.default.createElement(
                'label',
                null,
                'Duration',
                _react2.default.createElement(
                  'select',
                  null,
                  _react2.default.createElement(
                    'option',
                    { value: '1' },
                    '1 Hour'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: '2' },
                    '2 Hours'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: '3' },
                    '3 Hours'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: '4' },
                    '4 Hours'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: '>4' },
                    'Over 4 Hours'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement(
                'legend',
                null,
                'Event Details:'
              ),
              _react2.default.createElement('input', { type: 'text', placeholder: 'Event Name (Optional)' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'medium-6 columns' },
              _react2.default.createElement(
                'label',
                null,
                'Event Type',
                _react2.default.createElement(
                  'select',
                  null,
                  _react2.default.createElement(
                    'option',
                    { value: 'wedding' },
                    'Wedding'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'gala' },
                    'Gala'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'networking' },
                    'Networking'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'party' },
                    'Party'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'performance' },
                    'Performance'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'conference' },
                    'Conference'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'sports' },
                    'Sports'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'festival' },
                    'Festival'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'private' },
                    'Private'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'others' },
                    'Others'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'medium-6 columns' },
              _react2.default.createElement(
                'label',
                null,
                'Indoor/Outdoor',
                _react2.default.createElement(
                  'select',
                  null,
                  _react2.default.createElement(
                    'option',
                    { value: 'select' },
                    'Select One'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'indoor' },
                    'Indoor'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'outdoor' },
                    'Outdoor'
                  ),
                  _react2.default.createElement(
                    'option',
                    { value: 'mix' },
                    'Mix of both'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement('input', { type: 'text', placeholder: 'Event Street Address' }),
              _react2.default.createElement('input', { type: 'text', placeholder: 'Street Address 2 (Optional)' }),
              _react2.default.createElement('input', { type: 'text', placeholder: 'City, State, Zipcode' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement(
                'legend',
                null,
                'Notes (Optional)'
              ),
              _react2.default.createElement('textarea', { className: 'textbox', form: 'request-form', rows: '4', placeholder: 'Additional notes (optional)', maxlength: '1000' }),
              _react2.default.createElement(
                'p',
                { className: 'help-text', id: 'notesHelpText' },
                'Limited to 1000 characters.'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row section' },
            _react2.default.createElement(
              'div',
              { className: 'columns' },
              _react2.default.createElement(
                'p',
                { className: 'help-text', id: 'requestHelpText' },
                'Your request will be sent directly to this photographer and a copy will appear in the "My Requests" tab on your account page. You will be able to see updates and track your request there.'
              ),
              _react2.default.createElement('input', { type: 'submit', className: 'button', value: 'Submit Request' }),
              ' ',
              _react2.default.createElement('input', { type: 'submit', className: 'hollow button', value: 'Cancel' })
            )
          )
        ),
        _react2.default.createElement('br', null)
      );
    }
  }]);

  return QuoteRequest;
}(_react2.default.Component);

exports.default = QuoteRequest;

},{"../../actions/photographerActions":2,"../../stores/sessionStore":42,"react":"react","react-dom":"react-dom","react-dropzone":52,"react-router":"react-router"}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _userStore = require('../../stores/userStore');

var _userStore2 = _interopRequireDefault(_userStore);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountFavorites = function (_React$Component) {
  _inherits(AccountFavorites, _React$Component);

  function AccountFavorites() {
    _classCallCheck(this, AccountFavorites);

    var _this = _possibleConstructorReturn(this, (AccountFavorites.__proto__ || Object.getPrototypeOf(AccountFavorites)).call(this));

    _this.state = _userStore2.default.getFavorites();
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(AccountFavorites, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _userStore2.default.addChangeListener(this._onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _userStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_userStore2.default.getFavorites());
    }
  }, {
    key: 'render',
    value: function render() {

      var favorites = this.state.favorites.map(function (phot, i) {
        return _react2.default.createElement(
          'div',
          { key: i, className: 'small-12 large-6 columns' },
          _react2.default.createElement(
            'div',
            { className: 'profile-card-mini' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: "/photographers/profile/" + phot._id },
              _react2.default.createElement(
                'div',
                { className: 'avatar small' },
                _react2.default.createElement('img', { src: "../" + phot.avatarUrl })
              ),
              _react2.default.createElement(
                'div',
                { className: 'profile-info' },
                _react2.default.createElement(
                  'h5',
                  null,
                  phot.officialName
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement('i', { className: 'fa fa-map-marker' }),
                  '  ',
                  phot.locationString
                )
              )
            )
          )
        );
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'Favorite Photographers'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          favorites
        )
      );
    }
  }]);

  return AccountFavorites;
}(_react2.default.Component);

exports.default = AccountFavorites;

},{"../../stores/userStore":43,"react":"react","react-dom":"react-dom","react-router":"react-router"}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sessionActions = require('../../actions/sessionActions');

var _sessionActions2 = _interopRequireDefault(_sessionActions);

var _userStore = require('../../stores/userStore');

var _userStore2 = _interopRequireDefault(_userStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountHeader = function (_React$Component) {
  _inherits(AccountHeader, _React$Component);

  function AccountHeader() {
    _classCallCheck(this, AccountHeader);

    var _this = _possibleConstructorReturn(this, (AccountHeader.__proto__ || Object.getPrototypeOf(AccountHeader)).call(this));

    _this.logout = _this.logout.bind(_this);
    return _this;
  }

  _createClass(AccountHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _userStore2.default.addChangeListener(this._onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _userStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      //ReactDOM.findDOMNode(this.refs.focus).focus();
      // this.setState(UserStore.getErrorState())
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
        { className: 'callout hero small account' },
        _react2.default.createElement(
          'div',
          { className: 'avatar-centered' },
          _react2.default.createElement('img', { src: "../" + this.props.avatarUrl })
        ),
        _react2.default.createElement(
          'h3',
          null,
          this.props.fullName
        ),
        _react2.default.createElement(
          'a',
          { onClick: this.logout },
          '(Logout)'
        )
      );
    }
  }]);

  return AccountHeader;
}(_react2.default.Component);

exports.default = AccountHeader;

},{"../../actions/sessionActions":4,"../../stores/userStore":43,"react":"react","react-dom":"react-dom"}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _userStore = require('../../stores/userStore');

var _userStore2 = _interopRequireDefault(_userStore);

var _userActions = require('../../actions/userActions');

var _userActions2 = _interopRequireDefault(_userActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountInfo = function (_React$Component) {
  _inherits(AccountInfo, _React$Component);

  function AccountInfo() {
    _classCallCheck(this, AccountInfo);

    var _this = _possibleConstructorReturn(this, (AccountInfo.__proto__ || Object.getPrototypeOf(AccountInfo)).call(this));

    _this.state = _userStore2.default.getAccountInfo();
    _this.updateAccount = _this.updateAccount.bind(_this);
    _this.resetFields = _this.resetFields.bind(_this);
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(AccountInfo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _userStore2.default.addChangeListener(this._onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _userStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      //ReactDOM.findDOMNode(this.refs.focus).focus();
      this.setState(_userStore2.default.getAccountInfo());
      this.resetFields();
    }
  }, {
    key: 'updateAccount',
    value: function updateAccount(e) {
      e.preventDefault();
      var userData = {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        email: this.refs.email.value,
        password: this.refs.password.value,
        oldPassword: this.refs.oldPassword.value,
        confirm: this.refs.confirm.value
      };
      var that = this;

      var id = this.state.id;
      _userActions2.default.updateAccountInfo(id, userData, function (data) {
        that.setState({ message: data.message, success: data.success });
        _reactDom2.default.findDOMNode(that.refs.firstName).focus();
        if (data.success) {
          that.resetFields();
        }
      });
    }
  }, {
    key: 'resetFields',
    value: function resetFields() {
      _reactDom2.default.findDOMNode(this.refs.firstName).value = this.state.firstName;
      _reactDom2.default.findDOMNode(this.refs.lastName).value = this.state.lastName;
      _reactDom2.default.findDOMNode(this.refs.email).value = this.state.email;
      _reactDom2.default.findDOMNode(this.refs.oldPassword).value = '';
      _reactDom2.default.findDOMNode(this.refs.password).value = '';
      _reactDom2.default.findDOMNode(this.refs.confirm).value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("state in AccountInfo: ", this.state);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'Edit Account Information'
        ),
        this.state.message ? _react2.default.createElement(
          'div',
          { className: this.state.success ? "callout success" : "callout alert" },
          _react2.default.createElement(
            'p',
            null,
            this.state.message
          )
        ) : null,
        _react2.default.createElement(
          'form',
          { id: 'edit-profile-form', onSubmit: this.updateAccount, name: 'edit-profile-form' },
          _react2.default.createElement(
            'legend',
            null,
            'First Name'
          ),
          _react2.default.createElement('input', { type: 'text', ref: 'firstName', name: 'firstname', id: 'firstname', placeholder: 'First name', required: true }),
          _react2.default.createElement(
            'legend',
            null,
            'Last Name'
          ),
          _react2.default.createElement('input', { type: 'text', ref: 'lastName', name: 'lastname', id: 'lastname', placeholder: 'Last name', required: true }),
          _react2.default.createElement(
            'legend',
            null,
            'Email Address'
          ),
          _react2.default.createElement('input', { type: 'email', ref: 'email', name: 'email', id: 'email', placeholder: 'Email address', disabled: true }),
          _react2.default.createElement(
            'legend',
            null,
            'Change Password'
          ),
          _react2.default.createElement('input', { type: 'password', ref: 'oldPassword', name: 'password', id: 'password', placeholder: 'Old Password' }),
          _react2.default.createElement('input', { type: 'password', ref: 'password', name: 'password', id: 'password', placeholder: 'New Password' }),
          _react2.default.createElement('input', { type: 'password', ref: 'confirm', name: 'password', id: 'password', placeholder: 'Confirm New Password' }),
          _react2.default.createElement('input', { type: 'submit', value: 'Save', onClick: this.updateAccount, className: 'button' }),
          ' ',
          _react2.default.createElement('input', { type: 'submit', value: 'Cancel', onClick: this.resetFields, className: 'hollow button' })
        )
      );
    }
  }]);

  return AccountInfo;
}(_react2.default.Component);

exports.default = AccountInfo;

},{"../../actions/userActions":5,"../../stores/userStore":43,"react":"react","react-dom":"react-dom"}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _userStore = require('../../stores/userStore');

var _userStore2 = _interopRequireDefault(_userStore);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountRequests = function (_React$Component) {
  _inherits(AccountRequests, _React$Component);

  function AccountRequests() {
    _classCallCheck(this, AccountRequests);

    var _this = _possibleConstructorReturn(this, (AccountRequests.__proto__ || Object.getPrototypeOf(AccountRequests)).call(this));

    _this.state = _userStore2.default.getFavorites();
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(AccountRequests, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _userStore2.default.addChangeListener(this._onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _userStore2.default.removeChangeListener(this._onChange);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_userStore2.default.getFavorites());
    }
  }, {
    key: 'render',
    value: function render() {

      var favorites = this.state.favorites.map(function (phot, i) {
        return _react2.default.createElement(
          'div',
          { key: i, className: 'small-12 large-6 columns' },
          _react2.default.createElement(
            'div',
            { className: 'profile-card-mini' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: "/photographers/profile/" + phot._id },
              _react2.default.createElement(
                'div',
                { className: 'avatar small' },
                _react2.default.createElement('img', { src: "../" + phot.avatarUrl })
              ),
              _react2.default.createElement(
                'div',
                { className: 'profile-info' },
                _react2.default.createElement(
                  'h5',
                  null,
                  phot.officialName
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement('i', { className: 'fa fa-map-marker' }),
                  '  ',
                  phot.locationString
                )
              )
            )
          )
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'tabs-panel is-active', id: 'requests' },
        _react2.default.createElement(
          'h3',
          null,
          'My Requests'
        ),
        _react2.default.createElement(
          'div',
          { className: 'event-card' },
          _react2.default.createElement(
            'div',
            { className: 'event-status' },
            _react2.default.createElement(
              'b',
              null,
              'Status: Pending Quote'
            ),
            ' (Event ID #0000000 - submitted on XX/XX/XXXX)'
          ),
          _react2.default.createElement(
            'div',
            { className: 'event-info' },
            _react2.default.createElement(
              'div',
              { className: 'event-photographer' },
              _react2.default.createElement('img', { src: '../img/users/avatar/001.jpg' }),
              _react2.default.createElement(
                'h5',
                null,
                'John Smith'
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement('i', { className: 'fa fa-map-marker' }),
                '  San Francisco, CA'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'event-details' },
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                'b',
                null,
                'Name:'
              ),
              ' Max',
              '\'',
              's Birthday',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'b',
                null,
                'Date:'
              ),
              ' 02/14/2016',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'b',
                null,
                'Time:'
              ),
              ' 11AM (2 Hours)',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'b',
                null,
                'Venue Type:'
              ),
              ' Private (Indoors)',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'b',
                null,
                'Address:'
              ),
              ' 123 This Street, San Francisco, CA 98765',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'b',
                null,
                'Notes:'
              ),
              ' None'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'event-action' },
            _react2.default.createElement(
              'em',
              null,
              'No actions required yet.'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'a',
              { href: '#' },
              'Cancel This Request'
            )
          )
        )
      );
    }
  }]);

  return AccountRequests;
}(_react2.default.Component);

exports.default = AccountRequests;

},{"../../stores/userStore":43,"react":"react","react-dom":"react-dom","react-router":"react-router"}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _accountInfo = require('./account-info');

var _accountInfo2 = _interopRequireDefault(_accountInfo);

var _accountFavorites = require('./account-favorites');

var _accountFavorites2 = _interopRequireDefault(_accountFavorites);

var _accountRequests = require('./account-requests');

var _accountRequests2 = _interopRequireDefault(_accountRequests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountTabTypes = function (_React$Component) {
  _inherits(AccountTabTypes, _React$Component);

  function AccountTabTypes() {
    _classCallCheck(this, AccountTabTypes);

    return _possibleConstructorReturn(this, (AccountTabTypes.__proto__ || Object.getPrototypeOf(AccountTabTypes)).apply(this, arguments));
  }

  _createClass(AccountTabTypes, [{
    key: 'onClick',
    value: function onClick(item) {
      this.props.onTabClick(item);
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("here in accountTabTypes: ", this.props);
      var active = this.props.active;

      var items = this.props.items.map(function (item, index) {
        return _react2.default.createElement(
          'li',
          { key: item.id, className: "tabs-title " + (active === item.id ? "is-active" : "") },
          _react2.default.createElement(
            'a',
            { 'aria-selected': active === item.id ? "true" : 'false', onClick: this.onClick.bind(this, item) },
            item.title
          )
        );
      }.bind(this));

      return _react2.default.createElement(
        'ul',
        { className: 'tabs vertical', id: 'account-tabs', 'data-tabs': true },
        items
      );
    }
  }]);

  return AccountTabTypes;
}(_react2.default.Component);

var AccountTabContent = function (_React$Component2) {
  _inherits(AccountTabContent, _React$Component2);

  function AccountTabContent() {
    _classCallCheck(this, AccountTabContent);

    return _possibleConstructorReturn(this, (AccountTabContent.__proto__ || Object.getPrototypeOf(AccountTabContent)).apply(this, arguments));
  }

  _createClass(AccountTabContent, [{
    key: 'render',
    value: function render() {
      var active = this.props.active;
      var items = this.props.items.map(function (item) {
        return _react2.default.createElement(
          'div',
          { key: item.id, className: "tabs-panel " + (active === item.id ? "is-active" : "") },
          item.content
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'tabs-content vertical', 'data-tabs-content': 'example-vert-tabs' },
        items
      );
    }
  }]);

  return AccountTabContent;
}(_react2.default.Component);

var AccountTabs = function (_React$Component3) {
  _inherits(AccountTabs, _React$Component3);

  function AccountTabs() {
    _classCallCheck(this, AccountTabs);

    var _this3 = _possibleConstructorReturn(this, (AccountTabs.__proto__ || Object.getPrototypeOf(AccountTabs)).call(this));

    _this3.state = {
      tabs: [{ title: 'My Requests', content: _react2.default.createElement(_accountRequests2.default, null), id: "requests" }, { title: 'Favorites', content: _react2.default.createElement(_accountFavorites2.default, null), id: "favorites" }, { title: 'Edit Info', content: _react2.default.createElement(_accountInfo2.default, null), id: "edit" }],
      activeItemId: 'requests'
    };
    _this3.handleTabClick = _this3.handleTabClick.bind(_this3);
    return _this3;
  }

  _createClass(AccountTabs, [{
    key: 'handleTabClick',
    value: function handleTabClick(item) {
      this.setState({ activeItemId: item.id });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("in accounttabs: ", this.state);
      return _react2.default.createElement(
        'div',
        { className: 'row section' },
        _react2.default.createElement(
          'div',
          { className: 'medium-3 columns' },
          _react2.default.createElement(AccountTabTypes, { items: this.state.tabs,
            active: this.state.activeItemId,
            onTabClick: this.handleTabClick })
        ),
        _react2.default.createElement(
          'div',
          { className: 'medium-9 columns' },
          _react2.default.createElement(AccountTabContent, { items: this.state.tabs,
            active: this.state.activeItemId })
        )
      );
    }
  }]);

  return AccountTabs;
}(_react2.default.Component);

exports.default = AccountTabs;

},{"./account-favorites":25,"./account-info":27,"./account-requests":28,"react":"react","react-router":"react-router"}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _authenticatedComponent = require('../authenticatedComponent');

var _authenticatedComponent2 = _interopRequireDefault(_authenticatedComponent);

var _reactRouter = require('react-router');

var _userStore = require('../../stores/userStore');

var _userStore2 = _interopRequireDefault(_userStore);

var _userActions = require('../../actions/userActions');

var _userActions2 = _interopRequireDefault(_userActions);

var _accountHeader = require('./account-header');

var _accountHeader2 = _interopRequireDefault(_accountHeader);

var _accountTabs = require('./account-tabs');

var _accountTabs2 = _interopRequireDefault(_accountTabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserAccount = function (_React$Component) {
  _inherits(UserAccount, _React$Component);

  function UserAccount() {
    _classCallCheck(this, UserAccount);

    var _this = _possibleConstructorReturn(this, (UserAccount.__proto__ || Object.getPrototypeOf(UserAccount)).call(this));

    _this.state = _userStore2.default.setFullState();

    console.log("here in UserAccount");
    return _this;
  }

  // componentWillMount() {
  //   UserActions.getUserAccountInfo(this.props.params.id);
  // }

  _createClass(UserAccount, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      _userStore2.default.addChangeListener(this.changeListener);
      _userActions2.default.getUserAccountInfo(this.props.params.id);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _userStore2.default.removeChangeListener(this.changeListener);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_userStore2.default.setFullState());
    }
  }, {
    key: '_onTabClick',
    value: function _onTabClick(type) {
      this.setState({ active: type });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("state: ", this.state);
      var headerInfo = this.state.headerInfo;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_accountHeader2.default, { fullName: headerInfo ? headerInfo.fullName : "",
          avatarUrl: headerInfo ? headerInfo.avatarUrl : '' }),
        _react2.default.createElement(_accountTabs2.default, { firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          avatarBase: this.state.avatarBase,
          avatarUrl: this.state.avatarUrl,
          favorites: this.state.favorites,
          requests: this.state.requests,
          reviews: this.state.reviews })
      );
    }
  }]);

  return UserAccount;
}(_react2.default.Component);

exports.default = (0, _authenticatedComponent2.default)(UserAccount);

},{"../../actions/userActions":5,"../../stores/userStore":43,"../authenticatedComponent":7,"./account-header":26,"./account-tabs":29,"react":"react","react-router":"react-router"}],31:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  UPDATE_SORT: 'UPDATE_SORT',
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_PHOTOS: 'UPDATE_PHOTOS'
});

},{"key-mirror":50}],32:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  GET_PHOTOGRAPHER_ACCOUNT: 'GET_PHOTOGRAPHER_ACCOUNT',
  APPLIED_FOR: 'APPLIED_FOR'
});

},{"key-mirror":50}],33:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  GET_PHOTOGRAPHER_PROFILE: 'GET_PHOTOGRAPHER_PROFILE',
  UPDATE_FAVORITE: 'UPDATE_FAVORITE'
});

},{"key-mirror":50}],34:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  LOGIN_PHOTOGRAPHER: 'LOGIN_PHOTOGRAPHER'
});

},{"key-mirror":50}],35:[function(require,module,exports){
'use strict';

var keyMirror = require('key-mirror');

module.exports = keyMirror({
  GET_USER_INFO: 'GET_USER_INFO',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO'
});

},{"key-mirror":50}],36:[function(require,module,exports){
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

},{"flux":48,"react/lib/Object.assign":53}],37:[function(require,module,exports){
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

},{"./routes":38,"react":"react","react-dom":"react-dom","react-router":"react-router"}],38:[function(require,module,exports){
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

var _explore = require('./components/explore/explore');

var _explore2 = _interopRequireDefault(_explore);

var _photographerHome = require('./components/photographerHome');

var _photographerHome2 = _interopRequireDefault(_photographerHome);

var _profile = require('./components/profile/profile');

var _profile2 = _interopRequireDefault(_profile);

var _quoteRequest = require('./components/profile/quoteRequest');

var _quoteRequest2 = _interopRequireDefault(_quoteRequest);

var _accountInfo = require('./components/photographer/account-info');

var _accountInfo2 = _interopRequireDefault(_accountInfo);

var _account = require('./components/user/account');

var _account2 = _interopRequireDefault(_account);

var _apply = require('./components/photographer/apply');

var _apply2 = _interopRequireDefault(_apply);

var _requireAuth = require('./utils/requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Explore Page
exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _app2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _login2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _signup2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'home', component: _explore2.default, onEnter: _requireAuth2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'photographers', component: _photographerHome2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'photographers/profile/:id', component: _profile2.default, onEnter: _requireAuth2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'apply', component: _apply2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'request', component: _quoteRequest2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'photographers/account/:id', component: _accountInfo2.default, onEnter: _requireAuth2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'users/:id', component: _account2.default, onEnter: _requireAuth2.default })
);

//Authentication for Routing


// Home Page


// NavBar

},{"./components/app":6,"./components/explore/explore":8,"./components/home":14,"./components/navbar/login":15,"./components/navbar/signup":17,"./components/photographer/account-info":18,"./components/photographer/apply":19,"./components/photographerHome":20,"./components/profile/profile":21,"./components/profile/quoteRequest":24,"./components/user/account":30,"./utils/requireAuth":44,"react":"react","react-router":"react-router"}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    return _possibleConstructorReturn(this, (BaseStore.__proto__ || Object.getPrototypeOf(BaseStore)).call(this));
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

},{"../dispatchers/appDispatcher":36,"events":46}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    var _this = _possibleConstructorReturn(this, (ExploreStore.__proto__ || Object.getPrototypeOf(ExploreStore)).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._location = null;
    _this._profiles = [];
    _this._message = '';

    _this._sortBy = null;
    _this._prevSortBy = null; // some slight optimization to not rerun sorts
    _this._sortHasChanged = false;

    _this._filters = [];
    return _this;
  }

  _createClass(ExploreStore, [{
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case _exploreConstants.UPDATE_LOCATION:
          console.log("UPDATE_LOCATION REACHED");
          this._profiles = action.profiles;
          this._location = action.locString;
          this._message = action.message;
          console.log(this._profiles);
          console.log(this._location);
          this.emitChange();
          break;
        case _exploreConstants.UPDATE_PHOTOS:
          console.log("UPDATE_PHOTOS REACHED");
          console.log("updating photos");
          this._profiles = action.profiles;
          console.log(this._profiles);
          this.emitChange();
          break;
        case _exploreConstants.UPDATE_FILTER:
          console.log("UPDATE_FILTER REACHED");
          this._filters = action.filters;

          this.emitChange();
          break;
        case _exploreConstants.UPDATE_SORT:
          console.log("UPDATE_SORT REACHED");
          this._sortBy = action.sortBy;
          this._sortHasChanged = this._prevSortBy !== this._sortBy;
          if (this._sortHasChanged) {
            this._prevSortBy = this._sortBy;
          }
          this.emitChange();
          break;
        default:
          break;
      };
    }
  }, {
    key: 'setFullState',
    value: function setFullState() {
      return {
        profiles: this._profiles,
        location: this._location,
        sortBy: this._sortBy,
        sortHasChanged: this._sortHasChanged,
        filters: this._filters
      };
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      return {
        location: this._location,
        message: this._message
      };
    }
  }, {
    key: 'getSortState',
    value: function getSortState() {
      return {
        sortBy: this._sortBy
      };
    }
  }, {
    key: 'getErrorState',
    value: function getErrorState() {
      return {
        message: this._message
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
  }, {
    key: 'location',
    get: function get() {
      return this._location;
    }
  }]);

  return ExploreStore;
}(_baseStore2.default);

exports.default = new ExploreStore();

},{"../constants/exploreConstants":31,"./baseStore":39,"react-router":"react-router"}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _profileConstants = require('../constants/profileConstants.js');

var _baseStore = require('./baseStore');

var _baseStore2 = _interopRequireDefault(_baseStore);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileStore = function (_BaseStore) {
  _inherits(ProfileStore, _BaseStore);

  function ProfileStore() {
    _classCallCheck(this, ProfileStore);

    var _this = _possibleConstructorReturn(this, (ProfileStore.__proto__ || Object.getPrototypeOf(ProfileStore)).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._firstName = '';
    _this._id = '';
    _this._lastName = '';
    _this._isLoggedIn = false;
    _this._coverUrl = null;
    _this._avatarUrl = null;
    _this._officialName = '';
    _this._locationString = '';
    _this._aboutMe = '';
    _this._portfolio = '';
    _this._facebook = '';
    _this._twitter = '';
    _this._instagram = '';
    _this._flickr = '';
    _this._reviews = [];
    _this._bookings = [];
    _this._numReviews = 0;
    _this._specialities = [];
    _this._numFavorites = 0;
    _this._updated = false;
    _this._rating = '';
    return _this;
  }

  _createClass(ProfileStore, [{
    key: 'clearState',
    value: function clearState() {
      this._id = '';
      this._firstName = '';
      this._lastName = '';
      this._isLoggedIn = false;
      this._coverUrl = null;
      this._avatarUrl = null;
      this._officialName = '';
      this._locationString = '';
      this._aboutMe = '';
      this._portfolio = '';
      this._facebook = '';
      this._twitter = '';
      this._instagram = '';
      this._flickr = '';
      this._reviews = [];
      this._bookings = [];
      this._numReviews = 0;
      this._specialities = [];
      this._numFavorites = 0;
      this._updated = false;
      this._rating = '';
    }
  }, {
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case _profileConstants.GET_PHOTOGRAPHER_PROFILE:
          console.log("got photographer profile: ", action.profile);
          this._coverUrl = "../../" + action.profile.coverUrl; //current route is /photographer/profile
          this._avatarUrl = "../../" + action.profile.avatarUrl;
          this._officialName = action.profile.officialName;
          this._locationString = action.profile.locationString;
          this._portfolio = action.profile.links.portfolio;
          this._facebook = action.profile.links.facebook;
          this._twitter = action.profile.links.twitter;
          this._instagram = action.profile.links.instagram;
          this._flickr = action.profile.links.flickr;
          this._numFavorites = action.profile.favorites;
          this._rating = action.profile.rating;
          console.log("rating: ", action.profile.rating);
          this._updated = true;
          this._specialities = action.profile.specialities;
          this._reviews = action.profile.reviews;
          this._numReviews = action.profile.numReviews;
          this._aboutMe = action.profile.aboutMe;
          this._id = action.profile._id;
          this.emitChange();
          break;
        case _profileConstants.UPDATE_FAVORITE:
          console.log("in UPDATE_FAVORITES");
          this._numFavorites = action.profile.favorites;
          console.log(action.profile.favorites);
          console.log("in favorites: ", this._numFavorites);
          this.emitChange();
        default:
          break;
      };
    }
  }, {
    key: 'getProfileState',
    value: function getProfileState() {
      return {
        // profile header
        coverUrl: this._coverUrl,
        // profile title
        id: this._id,
        avatarUrl: this._avatarUrl,
        officialName: this._officialName,
        locationString: this._locationString,
        portfolio: this._portfolio,
        facebook: this._facebook,
        twitter: this._twitter,
        instagram: this._instagram,
        flickr: this._flickr,
        bookings: this._bookings,
        numFavorites: this._numFavorites,
        updated: this._updated,
        rating: this._rating,
        numReviews: this._numReviews,
        // profile content
        reviews: this._reviews,
        specialities: this._specialities,
        aboutMe: this._aboutMe
      };
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn() {
      return !!this._email;
    }
  }]);

  return ProfileStore;
}(_baseStore2.default);

exports.default = new ProfileStore();

},{"../constants/profileConstants.js":33,"./baseStore":39,"react-router":"react-router"}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sessionConstants = require('../constants/sessionConstants');

var _baseStore = require('./baseStore');

var _baseStore2 = _interopRequireDefault(_baseStore);

var _reactRouter = require('react-router');

var _profileConstants = require('../constants/profileConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionStore = function (_BaseStore) {
  _inherits(SessionStore, _BaseStore);

  function SessionStore() {
    _classCallCheck(this, SessionStore);

    var _this = _possibleConstructorReturn(this, (SessionStore.__proto__ || Object.getPrototypeOf(SessionStore)).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._user = null;
    _this._isLoggedIn = false;
    _this._autoLogin();
    return _this;
  }

  _createClass(SessionStore, [{
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case _sessionConstants.LOGIN_USER:
          console.log("LOGIN_USER REACHED");
          this._user = action.user;
          console.log("in sessionStore.LOGIN_USER:", localStorage.getItem('user'));
          this.emitChange();
          _reactRouter.browserHistory.push('/home'); //redirect after state changes
          break;
        case _sessionConstants.LOGIN_PHOTOGRAPHER:
          console.log("LOGIN_PHOTOGRAPHER REACHED");
          this._user = action.user;
          this.emitChange();
        case _sessionConstants.LOGOUT_USER:
          console.log("LOGOUT_USER REACHED");
          this._user = null;
          this.emitChange();
          break;
        case _profileConstants.UPDATE_FAVORITE:
          this._user = action.user;
          localStorage.setItem('user', JSON.stringify(this._user));
          this.emitChange();
        default:
          break;
      };
    }
  }, {
    key: '_autoLogin',
    value: function _autoLogin() {
      if (typeof Storage !== "undefined") {
        var user = localStorage.getItem("user");
        console.log(user);
        if (user) {
          this._user = JSON.parse(user);
          console.log("&*&*&* autologin success");
        }
      }
    }
  }, {
    key: 'getState',
    value: function getState() {
      return {
        user: this._user,
        isLoggedIn: this.isLoggedIn()
      };
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn() {
      return !!this._user;
    }
  }, {
    key: 'user',
    get: function get() {
      return this._user;
    }
  }]);

  return SessionStore;
}(_baseStore2.default);

exports.default = new SessionStore();

},{"../constants/profileConstants":33,"../constants/sessionConstants":34,"./baseStore":39,"react-router":"react-router"}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _userConstants = require('../constants/userConstants');

var _baseStore = require('./baseStore');

var _baseStore2 = _interopRequireDefault(_baseStore);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserStore = function (_BaseStore) {
  _inherits(UserStore, _BaseStore);

  function UserStore() {
    _classCallCheck(this, UserStore);

    var _this = _possibleConstructorReturn(this, (UserStore.__proto__ || Object.getPrototypeOf(UserStore)).call(this));

    _this.subscribe(function () {
      return _this._registerToActions.bind(_this);
    });
    _this._id = '';
    _this._message = '';
    _this._headerInfo = null;
    _this._accountInfo = null;
    _this._favorites = [];
    _this._requests = [];
    _this._reviews = [];
    _this._firstName = '';
    _this._lastName = '';
    _this._email = '';
    _this._avatarBase = '';
    _this._avatarUrl = '';
    return _this;
  }

  _createClass(UserStore, [{
    key: '_registerToActions',
    value: function _registerToActions(payload) {
      var action = payload.action;
      switch (action.actionType) {
        case _userConstants.GET_USER_INFO:
          console.log("GET_USER_INFO REACHED");
          console.log(action.user);
          this._id = action.user._id;
          this._firstName = action.user.firstName;
          this._lastName = action.user.lastName;
          this._email = action.user.email;
          this._avatarBase = action.user.avatarBase;
          this._avatarUrl = action.user.avatarUrl;
          this._headerInfo = {
            fullName: action.user.fullName,
            avatarUrl: action.user.avatarUrl
          };
          this._favorites = action.user.favorites, this._requests = action.user.bookings, this._reviews = action.user.reviews, this.emitChange();
          break;
        case _userConstants.UPDATE_USER_INFO:
          console.log("UPDATE_USER_INFO REACHED");
          //this._accountInfo = {
          this._firstName = action.user.firstName, this._lastName = action.user.lastName, this._email = action.user.email, this._avatarBase = action.user.avatarBase, this._avatarUrl = action.user.avatarUrl;
          this.emitChange();
        //}
        default:
          break;
      };
    }
  }, {
    key: 'getAccountInfo',
    value: function getAccountInfo() {
      return {
        id: this._id,
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        avatarBase: this._avatarBase,
        avatarUrl: this._avatarUrl,
        message: ''
      };
    }
  }, {
    key: 'getFavorites',
    value: function getFavorites() {
      return {
        favorites: this._favorites
      };
    }
  }, {
    key: 'setFullState',
    value: function setFullState() {
      return {
        headerInfo: this._headerInfo,
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        avatarBase: this._avatarBase,
        avatarUrl: this._avatarUrl,
        favorites: this._favorites,
        requests: this._requests,
        reviews: this._reviews,
        settingsErrorMessage: this._message
      };
    }
  }]);

  return UserStore;
}(_baseStore2.default);

exports.default = new UserStore();

},{"../constants/userConstants":35,"./baseStore":39,"react-router":"react-router"}],44:[function(require,module,exports){
'use strict';

var _sessionStore = require('../stores/sessionStore');

var _sessionStore2 = _interopRequireDefault(_sessionStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("in requireAuth");
function is_server() {
  return !(typeof window != 'undefined' && window.document);
}

function requireAuth(nextState, replace) {
  console.log("evoked requireAuth");
  console.log("in requireAuth, loggedin: ", _sessionStore2.default.isLoggedIn());
  if (is_server()) {
    console.log("Have to authenticate on the server side... ");
  } else if (!_sessionStore2.default.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

module.exports = requireAuth;

},{"../stores/sessionStore":42}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpecTools = function () {

  var specialitiesDict = {
    "portrait": "Portrait",
    "headshot": "Headshot",
    "events": "Events",
    "engagement": "Engagement",
    "wedding": "Wedding",
    "lifestyle": "Lifestyle/Candid",
    "club": "Club/Nightlife",
    "concert": "Concert/Performance",
    "commercial": "Commercial",
    "arch": "Real Estate",
    "sports": "Sports",
    "nature": "Nature"
  };

  var data = [{ id: "portrait", selected: false }, { id: "headshot", selected: false }, { id: "events", selected: false }, { id: "engagement", selected: false }, { id: "wedding", selected: false }, { id: "lifestyle", selected: false }, { id: "club", selected: false }, { id: "concert", selected: false }, { id: "commercial", selected: false }, { id: "arch", selected: false }, { id: "sports", selected: false }, { id: "nature", selected: false }];

  return {
    getCheckBoxes: function getCheckBoxes(updatedData, cb) {
      var checks = updatedData.map(function (d) {
        var WORDS = specialitiesDict[d.id];
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', { key: d.id + 'input', id: d.id, checked: d.selected, type: 'checkbox', onChange: cb(d.id) }),
          _react2.default.createElement(
            'label',
            { key: d.id + 'label', htmlFor: d.id },
            WORDS
          ),
          _react2.default.createElement('br', null)
        );
      });
      return checks;
    },
    idToString: specialitiesDict,
    initCheckedState: data
  };
}();

exports.default = SpecTools;

},{"react":"react","react-dom":"react-dom"}],46:[function(require,module,exports){
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
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
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

},{}],47:[function(require,module,exports){
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
},{"_process":51}],48:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":49}],49:[function(require,module,exports){
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
},{"_process":51,"fbjs/lib/invariant":47}],50:[function(require,module,exports){

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

},{}],51:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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

},{}],52:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Dropzone"] = factory(require("react"));
	else
		root["Dropzone"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _attrAccept = __webpack_require__(1);
	
	var _attrAccept2 = _interopRequireDefault(_attrAccept);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint prefer-template: 0 */
	
	var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;
	
	var Dropzone = function (_React$Component) {
	  _inherits(Dropzone, _React$Component);
	
	  function Dropzone(props, context) {
	    _classCallCheck(this, Dropzone);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropzone).call(this, props, context));
	
	    _this.onClick = _this.onClick.bind(_this);
	    _this.onDragStart = _this.onDragStart.bind(_this);
	    _this.onDragEnter = _this.onDragEnter.bind(_this);
	    _this.onDragLeave = _this.onDragLeave.bind(_this);
	    _this.onDragOver = _this.onDragOver.bind(_this);
	    _this.onDrop = _this.onDrop.bind(_this);
	
	    _this.state = {
	      isDragActive: false
	    };
	    return _this;
	  }
	
	  _createClass(Dropzone, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.enterCounter = 0;
	    }
	  }, {
	    key: 'onDragStart',
	    value: function onDragStart(e) {
	      if (this.props.onDragStart) {
	        this.props.onDragStart.call(this, e);
	      }
	    }
	  }, {
	    key: 'onDragEnter',
	    value: function onDragEnter(e) {
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
	    }
	  }, {
	    key: 'onDragOver',
	    value: function onDragOver(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      e.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
	      return false;
	    }
	  }, {
	    key: 'onDragLeave',
	    value: function onDragLeave(e) {
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
	    }
	  }, {
	    key: 'onDrop',
	    value: function onDrop(e) {
	      e.preventDefault();
	
	      // Reset the counter along with the drag on a drop.
	      this.enterCounter = 0;
	
	      this.setState({
	        isDragActive: false,
	        isDragReject: false
	      });
	
	      var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
	      var max = this.props.multiple ? droppedFiles.length : Math.min(droppedFiles.length, 1);
	      var files = [];
	
	      for (var i = 0; i < max; i++) {
	        var file = droppedFiles[i];
	        // We might want to disable the preview creation to support big files
	        if (!this.props.disablePreview) {
	          file.preview = window.URL.createObjectURL(file);
	        }
	        files.push(file);
	      }
	
	      if (this.allFilesAccepted(files) && this.allFilesMatchSize(files)) {
	        if (this.props.onDrop) {
	          this.props.onDrop.call(this, files, e);
	        }
	
	        if (this.props.onDropAccepted) {
	          this.props.onDropAccepted.call(this, files, e);
	        }
	      } else {
	        if (this.props.onDropRejected) {
	          this.props.onDropRejected.call(this, files, e);
	        }
	      }
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick() {
	      if (!this.props.disableClick) {
	        this.open();
	      }
	    }
	  }, {
	    key: 'allFilesAccepted',
	    value: function allFilesAccepted(files) {
	      var _this2 = this;
	
	      return files.every(function (file) {
	        return (0, _attrAccept2.default)(file, _this2.props.accept);
	      });
	    }
	  }, {
	    key: 'allFilesMatchSize',
	    value: function allFilesMatchSize(files) {
	      var _this3 = this;
	
	      return files.every(function (file) {
	        return file.size <= _this3.props.maxSize && file.size >= _this3.props.minSize;
	      });
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.fileInputEl.value = null;
	      this.fileInputEl.click();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;
	
	      var _props = this.props;
	      var accept = _props.accept;
	      var activeClassName = _props.activeClassName;
	      var inputProps = _props.inputProps;
	      var multiple = _props.multiple;
	      var name = _props.name;
	      var rejectClassName = _props.rejectClassName;
	
	      var rest = _objectWithoutProperties(_props, ['accept', 'activeClassName', 'inputProps', 'multiple', 'name', 'rejectClassName']);
	
	      var activeStyle = rest.activeStyle;
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
	
	      var appliedStyle = void 0;
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
	          return _this4.fileInputEl = el;
	        }, // eslint-disable-line
	        onChange: this.onDrop
	      };
	
	      if (name && name.length) {
	        inputAttributes.name = name;
	      }
	
	      // Remove custom properties before passing them to the wrapper div element
	      var customProps = ['disablePreview', 'disableClick', 'onDropAccepted', 'onDropRejected', 'maxSize', 'minSize'];
	      var divProps = _extends({}, props);
	      customProps.forEach(function (prop) {
	        return delete divProps[prop];
	      });
	
	      return _react2.default.createElement(
	        'div',
	        _extends({
	          className: className,
	          style: appliedStyle
	        }, divProps /* expand user provided props first so event handlers are never overridden */, {
	          onClick: this.onClick,
	          onDragStart: this.onDragStart,
	          onDragEnter: this.onDragEnter,
	          onDragOver: this.onDragOver,
	          onDragLeave: this.onDragLeave,
	          onDrop: this.onDrop
	        }),
	        this.props.children,
	        _react2.default.createElement('input', _extends({}, inputProps /* expand user provided inputProps first so inputAttributes override them */, inputAttributes))
	      );
	    }
	  }]);
	
	  return Dropzone;
	}(_react2.default.Component);
	
	Dropzone.defaultProps = {
	  disablePreview: false,
	  disableClick: false,
	  multiple: true,
	  maxSize: Infinity,
	  minSize: 0
	};
	
	Dropzone.propTypes = {
	  // Overriding drop behavior
	  onDrop: _react2.default.PropTypes.func,
	  onDropAccepted: _react2.default.PropTypes.func,
	  onDropRejected: _react2.default.PropTypes.func,
	
	  // Overriding drag behavior
	  onDragStart: _react2.default.PropTypes.func,
	  onDragEnter: _react2.default.PropTypes.func,
	  onDragLeave: _react2.default.PropTypes.func,
	
	  children: _react2.default.PropTypes.node, // Contents of the dropzone
	  style: _react2.default.PropTypes.object, // CSS styles to apply
	  activeStyle: _react2.default.PropTypes.object, // CSS styles to apply when drop will be accepted
	  rejectStyle: _react2.default.PropTypes.object, // CSS styles to apply when drop will be rejected
	  className: _react2.default.PropTypes.string, // Optional className
	  activeClassName: _react2.default.PropTypes.string, // className for accepted state
	  rejectClassName: _react2.default.PropTypes.string, // className for rejected state
	
	  disablePreview: _react2.default.PropTypes.bool, // Enable/disable preview generation
	  disableClick: _react2.default.PropTypes.bool, // Disallow clicking on the dropzone container to open file dialog
	
	  inputProps: _react2.default.PropTypes.object, // Pass additional attributes to the <input type="file"/> tag
	  multiple: _react2.default.PropTypes.bool, // Allow dropping multiple files
	  accept: _react2.default.PropTypes.string, // Allow specific types of files. See https://github.com/okonet/attr-accept for more information
	  name: _react2.default.PropTypes.string, // name attribute for the input tag
	  maxSize: _react2.default.PropTypes.number,
	  minSize: _react2.default.PropTypes.number
	};
	
	exports.default = Dropzone;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){"use strict";n.__esModule=!0,r(8),r(9),n["default"]=function(t,n){if(t&&n){var r=function(){var r=n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return{v:r.some(function(t){var n=t.trim();return"."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):/\/\*$/.test(n)?i===n.replace(/\/.*$/,""):o===n})}}();if("object"==typeof r)return r.v}return!0},t.exports=n["default"]},function(t,n){var r=t.exports={version:"1.2.2"};"number"==typeof __e&&(__e=r)},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(2),o=r(1),i=r(4),u=r(19),c="prototype",f=function(t,n){return function(){return t.apply(n,arguments)}},s=function(t,n,r){var a,p,l,d,y=t&s.G,h=t&s.P,v=y?e:t&s.S?e[n]||(e[n]={}):(e[n]||{})[c],x=y?o:o[n]||(o[n]={});y&&(r=n);for(a in r)p=!(t&s.F)&&v&&a in v,l=(p?v:r)[a],d=t&s.B&&p?f(l,e):h&&"function"==typeof l?f(Function.call,l):l,v&&!p&&u(v,a,l),x[a]!=l&&i(x,a,d),h&&((x[c]||(x[c]={}))[a]=l)};e.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,n,r){var e=r(5),o=r(18);t.exports=r(22)?function(t,n,r){return e.setDesc(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){var e=r(20)("wks"),o=r(2).Symbol;t.exports=function(t){return e[t]||(e[t]=o&&o[t]||(o||r(6))("Symbol."+t))}},function(t,n,r){r(26),t.exports=r(1).Array.some},function(t,n,r){r(25),t.exports=r(1).String.endsWith},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r(7)("match")]=!1,!"/./"[t](n)}catch(o){}}return!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(16),o=r(11),i=r(7)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(2),o=r(4),i=r(6)("src"),u="toString",c=Function[u],f=(""+c).split(u);r(1).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,u){"function"==typeof r&&(o(r,i,t[n]?""+t[n]:f.join(String(n))),"name"in r||(r.name=n)),t===e?t[n]=r:(u||delete t[n],o(t,n,r))})(Function.prototype,u,function(){return"function"==typeof this&&this[i]||c.call(this)})},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e=r(17),o=r(13);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){t.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){"use strict";var e=r(3),o=r(24),i=r(21),u="endsWith",c=""[u];e(e.P+e.F*r(14)(u),"String",{endsWith:function(t){var n=i(this,t,u),r=arguments,e=r.length>1?r[1]:void 0,f=o(n.length),s=void 0===e?f:Math.min(o(e),f),a=String(t);return c?c.call(n,a,s):n.slice(s-a.length,s)===a}})},function(t,n,r){var e=r(5),o=r(3),i=r(1).Array||Array,u={},c=function(t,n){e.each.call(t.split(","),function(t){void 0==n&&t in i?u[t]=i[t]:t in[]&&(u[t]=r(12)(Function.call,[][t],n))})};c("pop,reverse,shift,keys,values,entries",1),c("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),c("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",u)}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;

},{"react":"react"}],53:[function(require,module,exports){
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
},{}]},{},[37]);
