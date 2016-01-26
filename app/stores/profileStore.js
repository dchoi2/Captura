import {GET_PHOTOGRAPHER_PROFILE, UPDATE_FAVORITE} from '../constants/profileConstants.js';
import BaseStore from './baseStore';
import {browserHistory} from 'react-router';

class ProfileStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._firstName = '';
    this._id = '';
    this._lastName = '';
    this._isLoggedIn = false;
    this._coverUrl = null;
    this._avatarUrl = null;
    this._officialName = '';
    this._locationString = '';
    this._aboutMe = ''
    this._portfolio = ''
    this._facebook = ''
    this._twitter = ''
    this._instagram = ''
    this._flickr = ''
    this._reviews = []
    this._bookings = []
    this._numReviews = 0;
    this._specialities = [];
    this._numFavorites = 0;
    this._updated = false;
    this._rating='';
  }

  clearState(){
    this._id = ''
    this._firstName = '';
    this._lastName = '';
    this._isLoggedIn = false;
    this._coverUrl = null;
    this._avatarUrl = null;
    this._officialName = '';
    this._locationString = '';
    this._aboutMe = ''
    this._portfolio = ''
    this._facebook = ''
    this._twitter = ''
    this._instagram = ''
    this._flickr = ''
    this._reviews = []
    this._bookings = []
    this._numReviews = 0;
    this._specialities = [];
    this._numFavorites = 0;
    this._updated = false;
    this._rating='';
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case GET_PHOTOGRAPHER_PROFILE:
        console.log("got photographer profile: ", action.profile)
        this._coverUrl = "../../" + action.profile.coverUrl; //current route is /photographer/profile
        this._avatarUrl = "../../" +action.profile.avatarUrl;
        this._officialName = action.profile.officialName;
        this._locationString = action.profile.locationString;
        this._portfolio = action.profile.links.portfolio
        this._facebook = action.profile.links.facebook
        this._twitter = action.profile.links.twitter
        this._instagram = action.profile.links.instagram
        this._flickr = action.profile.links.flickr
        this._numFavorites = action.profile.favorites
        this._rating = action.profile.rating;
        console.log("rating: ", action.profile.rating)
        this._updated = true;
        this._specialities = action.profile.specialities;
        this._reviews = action.profile.reviews
        this._numReviews = action.profile.numReviews
        this._aboutMe = action.profile.aboutMe;
        this._id = action.profile._id;
        this.emitChange();
        break;
      case UPDATE_FAVORITE:
        console.log("in UPDATE_FAVORITES")
        this._numFavorites = action.profile.favorites;
        console.log(action.profile.favorites)
        console.log("in favorites: ", this._numFavorites)
        this.emitChange();
      default:
        break;
    };
  }

  getProfileState() {
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
      aboutMe: this._aboutMe,
    }
  }

  isLoggedIn() {
    return !!this._email;
  }
}

export default new ProfileStore();