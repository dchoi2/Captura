import {GET_USER_INFO, UPDATE_USER_INFO} from '../constants/userConstants';
import BaseStore from './baseStore';
import {browserHistory} from 'react-router';


class UserStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._id=''
    this._message = '';
    this._headerInfo = null
    this._accountInfo = null
    this._favorites = []
    this._requests = []
    this._reviews = []
    this._firstName= ''
    this._lastName= ''
    this._email= ''
    this._avatarBase= ''
    this._avatarUrl= ''
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case GET_USER_INFO:
        console.log("GET_USER_INFO REACHED");
        console.log(action.user)
        this._id = action.user._id;
        this._firstName = action.user.firstName;
        this._lastName = action.user.lastName;
        this._email = action.user.email;
        this._avatarBase = action.user.avatarBase;
        this._avatarUrl = action.user.avatarUrl
        this._headerInfo = {
          fullName: action.user.fullName,
          avatarUrl: action.user.avatarUrl
        }
        this._favorites = action.user.favorites,
        this._requests = action.user.bookings,
        this._reviews = action.user.reviews,
        this.emitChange();
        break;
      case UPDATE_USER_INFO:
        console.log("UPDATE_USER_INFO REACHED");
        //this._accountInfo = {
        this._firstName = action.user.firstName,
        this._lastName = action.user.lastName,
        this._email = action.user.email,
        this._avatarBase = action.user.avatarBase,
        this._avatarUrl = action.user.avatarUrl
        this.emitChange()
        //}
      default:
        break;
    };
  }

  getAccountInfo() {
    return {
      id: this._id,
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      avatarBase: this._avatarBase,
      avatarUrl: this._avatarUrl,
      message: ''
    }
  }

  getFavorites() {
    return {
      favorites: this._favorites
    }
  }

  setFullState() {
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
    }
  }
}
export default new UserStore();