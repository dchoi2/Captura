import AppDispatcher from '../dispatchers/appDispatcher.js';
import {GET_PHOTOGRAPHER_PROFILE, UPDATE_FAVORITE} from '../constants/profileConstants.js';
import {browserHistory} from 'react-router'
//import RouterContainer from '../services/RouterContainer'

class ProfileActions{

  static getPhotographerProfileInfo(id){
    $.ajax({type: 'GET', url: '/api/photographers/public/'+id})
      .done(function(userData) {
        if (userData.success) {
          AppDispatcher.handleViewAction({
            actionType: GET_PHOTOGRAPHER_PROFILE,
            profile: userData.profile
          });
        }
        else {
          browserHistory.push('/')
        }

        // getReviewDetails(userData.profile.reviews)
      })
  }

  static sendFavorite(id) {
    $.ajax({type: 'POST', url: '/api/users/favorite/', data: {id: id}})
      .done(function(data) {
        if (data.success) {
          AppDispatcher.handleViewAction({
            actionType: UPDATE_FAVORITE,
            profile: data.profile,
            user: data.user
          })
        }
        else {console.log("failed: ", data.message)}
      })
  }

  static unFavorite(id) {
    $.ajax({type: 'DELETE', url: '/api/users/favorite/'+id})
      .done(function(data) {
        if (data.success) {
          AppDispatcher.handleViewAction({
            actionType: UPDATE_FAVORITE,
            profile: data.profile,
            user: data.user
          })
        }
        else {console.log("failed: ", data.message)}
      })
  }



}

export default ProfileActions
