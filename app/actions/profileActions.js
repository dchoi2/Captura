import AppDispatcher from '../dispatchers/appDispatcher.js';
import {GET_PHOTOGRAPHER_PROFILE} from '../constants/profileConstants.js';
import {browserHistory} from 'react-router'
//import RouterContainer from '../services/RouterContainer'

class ProfileActions{

  static getPhotographerProfileInfo(id){
    $.ajax({type: 'GET', url: '/api/photographers/public/'+id})
      .done(function(userData) {
        AppDispatcher.handleViewAction({
          actionType: GET_PHOTOGRAPHER_PROFILE,
          profile: userData.profile
        });

        // getReviewDetails(userData.profile.reviews)
      })
  }



}

export default ProfileActions
