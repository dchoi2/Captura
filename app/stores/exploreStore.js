import {UPDATE_FILTER, UPDATE_SORT} from '../constants/exploreConstants';
import BaseStore from './baseStore';
import {browserHistory} from 'react-router';


class SessionStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._location = null;
    this._firstName = null;
    this._lastName = null;
    this._email = null
    this._isLoggedIn = false;
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case UPDATE_FILTER:
        console.log("setting store")
        this._lastName = action.data.lastName
        this._firstName = action.data.firstName
        this._email = action.data.email
        this._isLoggedIn = true;

        this.emitChange();
        browserHistory.push('/');

        break;
      case UPDATE_SORT:
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

  getLocationState() {
    return {location: this._location}
  }

  isLoggedIn() {
    return !!this._email;
  }
}

export default new SessionStore();