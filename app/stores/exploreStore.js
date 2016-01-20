import {UPDATE_FILTER, UPDATE_SORT, UPDATE_PHOTOS} from '../constants/exploreConstants';
import BaseStore from './baseStore';
import {browserHistory} from 'react-router';


class ExploreStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._location = null;
    this._profiles = [];
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case UPDATE_PHOTOS:
        console.log("UPDATE_PHOTOS REACHED")
        console.log("updating photos");
        this._profiles = action.profiles;
        console.log(this._profiles)
        this.emitChange();
        break;
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

  setProfileState() {
    console.log('set profile states')
    return {
      profiles: this._profiles
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

export default new ExploreStore();