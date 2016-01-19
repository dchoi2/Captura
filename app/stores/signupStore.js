import {UNAUTHORIZED, FAILEDSIGNUP} from '../constants/sessionConstants';
import BaseStore from './baseStore';
//import jwt_decode from 'jwt-decode';


class SignupStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._firstName = ''
    this._lastName = ''
    this._email = ''
    this._password = ''
    this._confirm = ''
    this._message = ''
  }

  _registerToActions(payload) {
    var action = payload.action
    switch(action.actionType) {
      case FAILEDSIGNUP:
        console.log("FAILEDSIGNUP REACHED")
        this._message = action.message // i have no idea why there is another action
        this.emitChange();
        break;
      default:
        break;
    };
  }

  getInputState() {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      password: this._password,
      confirm: this._confirm,
      message: this._message
    };
  }
}

export default new SignupStore();