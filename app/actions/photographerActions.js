import AppDispatcher from '../dispatchers/appDispatcher.js';
import {GET_PHOTOGRAPHER_ACCOUNT, APPLIED_FOR} from '../constants/photographerConstants.js';
import {browserHistory} from 'react-router'
//import RouterContainer from '../services/RouterContainer'

class PhotographerActions{

  static getPhotographerAccountInfo(id){
    $.ajax({type: 'GET', url: '/api/photographers/account/'+id})
      .done(function(userData) {
        AppDispatcher.handleViewAction({
          actionType: GET_PHOTOGRAPHER_ACCOUNT,
          data: userData
        });
      })
  }

  static applyFor(applyData, cb) {
    $.ajax({type: 'POST', url: '/api/photographers/', data: applyData})
      .done(function(data) {
        console.log("sent Post")
        if (!data.success) {
          if (cb) cb(data)
        }
        else {
          console.log("success! ", data)

          //SessionActions.photographerLogin(applyData);
        }
      })
      .fail(function(data) {
        console.log("error happened", data)
      })
  }

}

export default PhotographerActions
