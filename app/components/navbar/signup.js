'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from '../../actions/sessionActions';
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

      SessionActions.signup(signupData, function(data) {
        that.setState({message: data.message})
        ReactDOM.findDOMNode(that.refs.firstName).focus();
      })

    }
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Sign Up</h1>
          <h2>
            {this.state.message}
          </h2>
          <form role="form" onSubmit={this.signup}>
            <input type="text" ref="firstName"  className="form-control" name="firstname" id="firstname" placeholder="First name" />
            <input type="text" ref="lastName"  className="form-control" name="lastname" id="lastname" placeholder="Last name" />
            <input type="text" ref="email"  className="form-control" name="email" id="email"  placeholder="Email" />
            <input type="password" ref="password" className="form-control" id="password" placeholder="Password" />
            <input type="password" ref="confirm"  className="form-control" id="password" placeholder="Confirm password" />

            <input type="submit" value="Sign Up" className="expanded button"/>
          </form>
          <p>{'Already have an account\u003F'} <Link to='/login'>Log in</Link></p>
      </div>
    );
  }
}

export default Signup;
