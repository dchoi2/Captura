import AppDispatcher from '../dispatchers/appDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/sessionConstants.js';
import {browserHistory} from 'react-router'
//import RouterContainer from '../services/RouterContainer'

class SessionActions{

  static checkSession(cb){
    $.ajax({type: 'GET', url: '/api/sessions/users'})
      .done(function(data) {
        AppDispatcher.handleViewAction({
          actionType: LOGIN_USER,
          user: data.user
        });


        localStorage.setItem('user', JSON.stringify(data.user))
        console.log("setting local storage user to ", localStorage.getItem('user'))
        if (cb) cb(data)
      })
  }

  static userLogin(loginData, cb) {
    $.ajax({ type: 'POST', url: '/api/sessions/users', data: loginData })
    .done(function(data) {
      if (!data.success) {
        console.log("login failed...");
        if (cb) cb(data);
      }
      else {
        console.log("validCredentials!")
        SessionActions.checkSession();
      }
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

  static getPhotographerInfo(){
    $.ajax({type: 'GET', url: '/api/sessions/photographer'})
      .done(function(userData) {
        AppDispatcher.handleViewAction({
          actionType: LOGIN_PHOTOGRAPHER,
          data: userData
        });
      })
  }

  static photographerLogin(applyData, cb) {
    $.ajax({ type: 'POST', url: '/api/sessions/photographers', data: applyData })
    .done(function(data) {
      if (!data.success) {
        console.log("login failed...");
        if (cb) cb(data)
      }
      else {
        console.log("validCredentials!")
        SessionActions.getPhotographerInfo();
      }
    })
  }

  static applyFor(applyData, cb) {
    $.ajax({type: 'POST', url: '/api/photographers', data: applyData})
      .done(function(data) {
        console.log("sent Post")
        if (!data.success) {
          if (cb) cb(data)
        }
        else {
          SessionActions.photographerLogin(applyData);
        }
      })
      .fail(function(data) {
        console.log("error happend", data)
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
