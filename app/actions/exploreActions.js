import AppDispatcher from '../dispatchers/appDispatcher.js';
import {UPDATE_LOCATION, UPDATE_SORT, UPDATE_FILTER, UPDATE_PHOTOS} from '../constants/exploreConstants.js';

class ExploreActions{

  static getPhotographers(number){
    $.ajax({type: 'GET', url: '/api/photographers'})
      .done(function(userData) {
        AppDispatcher.handleViewAction({
          actionType: UPDATE_PHOTOS,
          profiles: userData
        });
        //localStorage.setItem('user', userData.email)
      })
  }

  static searchLocation(location) {
    console.log("Logging in...")
    console.log(UNAUTHORIZED)
    return $.ajax({ type: 'POST', url: '/api/sessions', data: loginData })
    .done(function(data) {
      if (!data.success) {
        console.log("failure...");
        console.log(UNAUTHORIZED)
        AppDispatcher.handleViewAction({
          actionType: UNAUTHORIZED,
          message: data.message
        })
      }
      else {
        console.log("validCredentials!")
        SessionActions.getUserInfo();
      }
    })
  }



}

export default ExploreActions
