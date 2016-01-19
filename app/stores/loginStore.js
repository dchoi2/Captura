import {UNAUTHORIZED} from '../constants/sessionConstants';
import BaseStore from './baseStore';
//import jwt_decode from 'jwt-decode';

class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._email = '',
    this._password = ''
    this._message = ''
  }

  _registerToActions(payload) {
    var action = payload.action
    switch(action.actionType) {
      case UNAUTHORIZED:
        this._message = action.message // i have no idea why this is doing this
        this.emitChange();
        break;
      default:
        break;
    };
  }

  getInputState() {
    return {
      email: this._email,
      password: this._password,
      message: this._message
    };
  }

}

export default new LoginStore();