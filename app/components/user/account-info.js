'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import UserStore from '../../stores/userStore';
import UserActions from '../../actions/userActions';

class AccountInfo extends React.Component {
  constructor() {
    super()
    this.state = UserStore.getAccountInfo();
    this.updateAccount = this.updateAccount.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    //ReactDOM.findDOMNode(this.refs.focus).focus();
    this.setState(UserStore.getAccountInfo())
    this.resetFields();
  }

  updateAccount(e) {
    e.preventDefault();
    var userData = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      oldPassword: this.refs.oldPassword.value,
      confirm: this.refs.confirm.value
    }
    var that = this;

    var id = this.state.id;
    UserActions.updateAccountInfo(id, userData, function(data) {
      that.setState({message: data.message, success: data.success})
      ReactDOM.findDOMNode(that.refs.firstName).focus();
      if (data.success) {
        that.resetFields()
      }
    })
  }

  resetFields() {
    ReactDOM.findDOMNode(this.refs.firstName).value = this.state.firstName;
    ReactDOM.findDOMNode(this.refs.lastName).value = this.state.lastName;
    ReactDOM.findDOMNode(this.refs.email).value = this.state.email;
    ReactDOM.findDOMNode(this.refs.oldPassword).value = ''
    ReactDOM.findDOMNode(this.refs.password).value = ''
    ReactDOM.findDOMNode(this.refs.confirm).value =''
  }

  render() {
    console.log("state in AccountInfo: ", this.state)
    return (
      <div>
        <h3>Edit Account Information</h3>
        {this.state.message ?
        <div className={this.state.success?"callout success":"callout alert"}>
          <p>{this.state.message}</p>
        </div>
        :null
        }
        <form id="edit-profile-form" onSubmit={this.updateAccount} name="edit-profile-form" >
          <legend>First Name</legend><input type="text" ref="firstName" name="firstname" id="firstname" placeholder="First name" required/>
          <legend>Last Name</legend><input type="text" ref="lastName" name="lastname" id="lastname" placeholder="Last name" required/>
          <legend>Email Address</legend><input type="email" ref="email" name="email" id="email" placeholder="Email address" disabled/>
          <legend>Change Password</legend><input type="password" ref="oldPassword" name="password" id="password" placeholder="Old Password"/><input type="password" ref="password" name="password" id="password" placeholder="New Password"/><input type="password" ref="confirm" name="password" id="password" placeholder="Confirm New Password"/>
        <input type="submit" value="Save" onClick={this.updateAccount}  className="button"/> <input type="submit" value="Cancel" onClick={this.resetFields} className="hollow button"/>
        </form>
      </div>
    );
  }
}

export default AccountInfo;

