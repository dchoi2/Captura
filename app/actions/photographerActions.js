import AppDispatcher from '../dispatchers/appDispatcher.js';
import {GET_PHOTOGRAPHER} from '../constants/photographerConstants.js';
import {browserHistory} from 'react-router'
//import RouterContainer from '../services/RouterContainer'

class PhotographerActions{

  static getPhotographerInfo(id){
    $.ajax({type: 'GET', url: '/api/photographer/'+id})
      .done(function(userData) {
        AppDispatcher.handleViewAction({
          actionType: GET_PHOTOGRAPHER,
          data: userData
        });
      })
  }

}

export default PhotographerActions
