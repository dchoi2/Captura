import SessionStore from '../stores/sessionStore';
import SessionActions from '../actions/sessionActions';
import React from 'react'

var Shim = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  checkStuff(data) {
    if (data.user === null) {
      router.transitionTo('/login')
    }
  },

  transitionCheck(){
    var router = this.context.router;

    console.log("checking authentication")
    SessionActions.checkSession(this.checkStuff)


    //if not waiting for some async login outcome then re-direct to login
    if (!auth.isAsyncLoggingIn()){
      console.log('in shim redirecting to login');
      router.transitionTo('/login');
    }

    //if you've gone here by accident
    if(SessionStore.isLoggedIn()){
      console.log('in shim by accident, redirecting to', nextPathStore);
      router.transitionTo(nextPathStore);
    }
  },

  componentWillMount() {
    this.transitionCheck();
  },

  render() {
    return <div>waiting...</div>;
  }
});

module.exports = Shim;