import AppDispatcher from '../dispatchers/appDispatcher.js';
import {GET_USER_INFO, UPDATE_USER_INFO} from '../constants/userConstants.js';
import SessionActions from './sessionActions'
import {browserHistory} from 'react-router'

class UserActions{

  static updateAccountInfo(uid, userInfo, cb) {
    $.ajax({type: 'PUT', url: '/api/users/account/'+uid, data: userInfo})
      .done(function(data) {
        if (data.success) {
          console.log("user info updated")
          AppDispatcher.handleViewAction({
            actionType: UPDATE_USER_INFO,
            user: data.user
          });
        }
        cb(data)
      })
  }

  static signup(signupData, cb) {
    $.ajax({type: 'POST', url: '/api/users', data: signupData})
      .done(function(data) {
        if (!data.success) {
          if (cb) cb(data)
        }
        else {
          SessionActions.userLogin(signupData);
        }
      })
  }

  static getUserAccountInfo(uid){
    $.ajax({type: 'GET', url: '/api/users/account/'+uid})
      .done(function(userData) {
        if (userData.success) {
          AppDispatcher.handleViewAction({
            actionType: GET_USER_INFO,
            user: userData.user
          });
        }
        else {
          browserHistory.push('/')
        }
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

}

export default UserActions
