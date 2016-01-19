import React from 'react';
import SessionStore from '../stores/sessionStore';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      console.log("made it here")
      if (!SessionStore.isLoggedIn()) {
        transition.redirect('/login');
      }
    }

    constructor() {
      super()
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: SessionStore.isLoggedIn(),
        firstName: SessionStore.firstName,
        lastName: SessionStore.lastName,
        email: SessionStore.email
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      SessionStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
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