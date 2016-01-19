import AppDispatcher from '../dispatchers/appDispatcher.js';
import {LOGIN_USER, UNAUTHORIZED, FAILEDSIGNUP, LOGOUT_USER} from '../constants/sessionConstants.js';
import {browserHistory} from 'react-router'
//import RouterContainer from '../services/RouterContainer'

class SessionActions{

  static getUserInfo(){
    $.ajax({type: 'GET', url: '/api/sessions'})
      .done(function(userData) {
        AppDispatcher.handleViewAction({
          actionType: LOGIN_USER,
          data: userData
        });
        //localStorage.setItem('user', userData.email)
      })
  }

  static login(loginData) {
    return $.ajax({ type: 'POST', url: '/api/sessions', data: loginData })
    .done(function(data) {
      if (!data.success) {
        console.log("login failed...");
        AppDispatcher.handleViewAction({
          actionType: UNAUTHORIZED,
          message: data.message
        })
      }
      else {
        console.log("validCredentials!")
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
