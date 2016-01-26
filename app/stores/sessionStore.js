import {LOGIN_USER, LOGOUT_USER, LOGIN_PHOTOGRAPHER} from '../constants/sessionConstants';
import BaseStore from './baseStore';
import {browserHistory} from 'react-router';

class SessionStore extends BaseStore {


  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._user = null;
    this._isLoggedIn = false;
    this._autoLogin();
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case LOGIN_USER:
        console.log("LOGIN_USER REACHED")
        this._user = action.user
        console.log("in sessionStore.LOGIN_USER:", localStorage.getItem('user'))
        this.emitChange();
        browserHistory.push('/home'); //redirect after state changes
        break;
      case LOGIN_PHOTOGRAPHER:
        console.log("LOGIN_PHOTOGRAPHER REACHED")
        this._user = action.user
        this.emitChange();
      case LOGOUT_USER:
        console.log("LOGOUT_USER REACHED")
        this._user = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get user(){
    return this._user
  }

  _autoLogin () {
    if(typeof(Storage) !== "undefined"){
      let user = localStorage.getItem("user");
      console.log(user);
      if (user) {
        this._user = JSON.parse(user);
        console.log("&*&*&* autologin success")
      }
    }
  }

  getState() {
    return {
      user: this._user,
      isLoggedIn: this.isLoggedIn()
    }
  }

  isLoggedIn() {
    return !!this._user
  }
}

export default new SessionStore();