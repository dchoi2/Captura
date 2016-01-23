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

  static searchLocation(locData, cb) {
    return $.ajax({ type: 'POST', url: '/api/photographers/location', data: locData })
    .done(function(data) {
      if (!data.success) {
        console.log("failure...");
        cb(data)
      }
      else {
        console.log("location submitted")
        AppDispatcher.handleViewAction({
          actionType: UPDATE_LOCATION,
          profiles: data.profiles // should contain location
        })
      }
    })
  }

  static setSort(sortBy) {
    AppDispatcher.handleViewAction({
      actionType: UPDATE_SORT,
      sortBy: sortBy
    })
  }



}

export default ExploreActions
