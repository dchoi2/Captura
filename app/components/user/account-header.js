'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from '../../actions/sessionActions';
import UserStore from '../../stores/userStore';

class AccountHeader extends React.Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    //ReactDOM.findDOMNode(this.refs.focus).focus();
    // this.setState(UserStore.getErrorState())
  }

  logout(e) {
    e.preventDefault();
    SessionActions.logout();
  }

  render() {
    return (
    <div className="callout hero small account">
      <div className="avatar-centered"><img src={"../" + this.props.avatarUrl}/></div>
      <h3>{this.props.fullName}</h3>
      <a onClick={this.logout}>(Logout)</a>
    </div>
    );
  }
}

export default AccountHeader;

