import React from 'react';
import SessionStore from '../stores/sessionStore';
import SessionActions from '../actions/sessionActions';
import {browserHistory} from 'react-router';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {
    constructor() {
      super()
      this.state = this._getLoginState();
      //this._checkLoggedIn();
    }

    _getLoginState() {
      return {
        userLoggedIn: SessionStore.isLoggedIn(),
        user: SessionStore.user
      };
    }

    componentDidMount() {
      this.changeListener = this._checkLoggedIn.bind(this);
      SessionStore.addChangeListener(this.changeListener);
    }

    _checkLoggedIn() {
      var userLoggedInState = this._getLoginState();
      this.setState(userLoggedInState);

          //get any nextTransitionPath - NB it can only be got once then it self-nullifies
      // let transitionPath = RouterStore.nextTransitionPath || '/';

      //trigger router change
      console.log("&*&*&* App onLoginChange event: loggedIn=", userLoggedInState.userLoggedIn)
        // "nextTransitionPath=", transitionPath);

      if(userLoggedInState.userLoggedIn == false){
      //   router.transitionTo(transitionPath);
      // }else{
        browserHistory.push('/login');
      }
    }

    componentWillUnmount() {
      SessionStore.removeChangeListener(this.changeListener);
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        email={this.state.email}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};