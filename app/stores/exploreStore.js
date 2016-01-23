import {UPDATE_FILTER, UPDATE_SORT, UPDATE_PHOTOS, UPDATE_LOCATION} from '../constants/exploreConstants';
import BaseStore from './baseStore';
import {browserHistory} from 'react-router';


class ExploreStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._location = null;
    this._profiles = [];
    this._message = '';

    this._sortBy = null;
    this._prevSortBy = null; // some slight optimization to not rerun sorts
    this._sortHasChanged = false;

    this._filters = []
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case UPDATE_LOCATION:
        console.log("UPDATE_LOCATION REACHED");
        this._profiles = action.profiles
        console.log(this._profiles)
        this.emitChange();
        break;
      case UPDATE_PHOTOS:
        console.log("UPDATE_PHOTOS REACHED")
        console.log("updating photos");
        this._profiles = action.profiles;
        console.log(this._profiles)
        this.emitChange();
        break;
      case UPDATE_FILTER:
        console.log("UPDATE_FILTER REACHED")
        this._lastName = action.data.lastName
        this._firstName = action.data.firstName
        this._email = action.data.email
        this._isLoggedIn = true;

        this.emitChange();
        browserHistory.push('/');

        break;
      case UPDATE_SORT:
        console.log("UPDATE_SORT REACHED");
        this._sortBy = action.sortBy
        this._sortHasChanged = this._prevSortBy !== this._sortBy
        if (this._sortHasChanged) {
          this._prevSortBy = this._sortBy
        }
        this.emitChange();
        break;
      default:
        break;
    };
  }

  setFullState() {
    return {
      profiles: this._profiles,
      location: this._location,
      sortBy: this._sortBy,
      sortHasChanged: this._sortHasChanged,
      filters: this._filters
    }
  }

  getSortState() {
    return {
      sortBy: this._sortBy
    }
  }

  getErrorState() {
    return {
      message: this._message
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

  get location() {
    return this._location;
  }

  isLoggedIn() {
    return !!this._email;
  }
}

export default new ExploreStore();