'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from '../../actions/sessionActions';
import UserActions from '../../actions/userActions'
import {browserHistory, Link} from 'react-router';

class Signup extends React.Component {
  constructor() {
    super()
    this.state = this.resetState();
    this.signup = this.signup.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.firstName).focus();
  }

  resetState() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
      message: ''
    };
  }

  _onChange() {
    this.setState(this.resetState());
    ReactDOM.findDOMNode(this.refs.firstName).focus();
  }

  // This will be called when the user clicks on the login button
  signup(e) {
    e.preventDefault();
    console.log(this.refs.email.value, this.refs.password.value)
    if (this.refs.password.value !== this.refs.confirm.value) {
      this.setState({message: "Passwords don't match"});
    }
    else {
      var signupData = {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      var that = this;

      UserActions.signup(signupData, function(data) {
        that.setState({message: data.message})
        ReactDOM.findDOMNode(that.refs.firstName).focus();
      })

    }
  }

  render() {
    return (
    <div>
      <div className="callout small hero">
        <h1>Sign Up</h1>
      </div>
      <div id="login" className="callout medium photographer-login">
        {this.state.message ?
        <div className="callout alert">
          <p>{this.state.message}</p>
        </div> : null }
        <p>Want to sign up as a photographer? <Link to='/apply'>Apply Here</Link></p>
        <form id="signup-form" name="signup-form" onSubmit={this.signup}>
          <input type="text" ref="firstName" name="firstname" id="firstname" placeholder="First name"/>
          <input type="text" ref="lastName" name="lastname" id="lastname" placeholder="Last name"/>
          <input type="text" ref="email" name="email" id="email" placeholder="Email address"/>
          <input type="password" ref="password" name="password" id="password" placeholder="Password"/>
          <input type="password" ref="confirm" name="password" id="password" placeholder="Confirm Password"/>
          <input type="submit" value="Sign Up" className="expanded button"/>
        </form>
        <br/>
        <p>Already have an account? <Link to='/login'>Log in</Link></p>
      </div>
    </div>

    );
  }
}

export default Signup;
