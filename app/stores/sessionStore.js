import {LOGIN_USER, LOGOUT_USER} from '../constants/sessionConstants';
import BaseStore from './baseStore';
import {browserHistory} from 'react-router';


class SessionStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._firstName = null;
    this._lastName = null;
    this._email = null
    this._isLoggedIn = false;
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case LOGIN_USER:
        console.log("setting store")
        this._lastName = action.data.lastName
        this._firstName = action.data.firstName
        this._email = action.data.email
        this._isLoggedIn = true;

        this.emitChange();
        browserHistory.push('/home'); //redirect after state changes

        break;
      case LOGOUT_USER:
        console.log("clearing store");
        this._email = null;
        this._firstName = null;
        this._lastName = null;
        this._isLoggedIn = false
        this.emitChange();
        break;
      default:
        break;
    };
  }

  getState() {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      isLoggedIn: this._isLoggedIn
    }
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }
  get email() {
    return this._email;
  }

  isLoggedIn() {
    return !!this._email;
  }
}

export default new SessionStore();