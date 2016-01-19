import AppDispatcher from '../dispatchers/appDispatcher.js';
import {LOGIN_USER, UNAUTHORIZED, FAILEDSIGNUP, LOGOUT_USER} from '../constants/sessionConstants.js';
import {browserHistory} from 'react-router'
//import RouterContainer from '../services/RouterContainer'

class SessionActions{

  static getUserInfo(){
    console.log(LOGIN_USER)
    $.ajax({type: 'GET', url: '/api/sessions'})
      .done(function(userData) {
        AppDispatcher.handleViewAction({
          actionType: LOGIN_USER,
          data: userData
        });
        //localStorage.setItem('user', userData.email)
      })
  }

  static login(loginData, cb) {
    $.ajax({ type: 'POST', url: '/api/sessions', data: loginData })
    .done(function(data) {
      if (!data.success) {
        console.log("failure...");
        console.log(UNAUTHORIZED)
        AppDispatcher.handleViewAction({
          actionType: UNAUTHORIZED,
          message: data.message
        })
        if (cb) cb(false)
      }
      else {
        console.log("validCredentials!")
        if (cb) cb(true)
        SessionActions.getUserInfo();
      }
      // if (data.success) {
      //   browserHistory.push('/');
      // }
      // else {

      // }
    })
    // .fail(function (jqXhr) {
    //   console.log(jqXhr.responseJSON.message);
    // })
  }

  static signup(signupData) {
    return $.ajax({type: 'POST', url: '/api/users', data: signupData})
      .done(function(data) {
        if (!data.success) {
          AppDispatcher.handleViewAction({
            actionType: FAILEDSIGNUP,
            message: data.message
          })
        }
        else {
          SessionActions.login(signupData);
        }
      })
  }

  static logout() {
    browserHistory.push('/');
    localStorage.removeItem('user');
    AppDispatcher.handleViewAction({
      actionType: LOGOUT_USER
    });
  }

}

export default SessionActions
