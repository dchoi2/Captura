import AppDispatcher from '../dispatchers/appDispatcher.js';
import {UPDATE_LOCATION, UPDATE_SORT, UPDATE_FILTER, UPDATE_PHOTOS} from '../constants/exploreConstants.js';

class ExploreActions{

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
        console.log("here")
        if (!data.success) {
          AppDispatcher.handleViewAction({
            actionType: FAILEDSIGNUP,
            message: data.message
          })
        }
        else {
          console.log("data: ", data);
          SessionActions.login(signupData);
        }
      })
  }

}

export default ExploreActions
