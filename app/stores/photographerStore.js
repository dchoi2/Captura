import {GET_PHOTOGRAPHER_ACCOUNT, APPLIED_FOR} from '../constants/photographerConstants.js';
import BaseStore from './baseStore';
import {browserHistory} from 'react-router';


class PhotographerStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._firstName = null;
    this._lastName = null;
    this._email = null
    this._isLoggedIn = false;
    this._profile = null;
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case GET_PHOTOGRAPHER_ACCOUNT:
        this._lastName = action.data.lastName
        this._firstName = action.data.firstName
        this._email = action.data.email
        this._isLoggedIn = true;

        this.emitChange();
        browserHistory.push('/home'); //redirect after state changes
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

  isLoggedIn() {
    return !!this._email;
  }
}

export default new PhotographerStore();