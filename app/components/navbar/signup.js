'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from '../../actions/sessionActions';
import {browserHistory} from 'react-router';
import SignupStore from '../../stores/signupStore';

class Signup extends React.Component {
  constructor() {
    super()
    this.state = SignupStore.getInputState();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    this.signup = this.signup.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.addChangeListener(this._onChange);
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  componentWillUnmount() {
    SignupStore.removeChangeListener(this._onChange);
  }

  _onChange() {

    this.setState(SignupStore.getInputState());
    console.log("changing state:", this.state)
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePwdChange(e) {
    this.setState({password: e.target.value});
  }

  handleConfirmChange(e) {
    this.setState({confirm: e.target.value});
  }

  // This will be called when the user clicks on the login button
  signup(e) {
    e.preventDefault();
    console.log(this.state.email, this.state.password)
    if (this.state.password !== this.state.confirm) {
      this.setState({message: "Passwords don't match"});
    }
    else {
      var signupData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }
      console.log("asdf",signupData);
      SessionActions.signup(signupData)
        .fail(function(err) {
          alert("There's an error signing up");
          console.log("Error signing in", err);
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
            <input type="text" ref="focus" onChange={this.handleFirstNameChange} value={this.state.firstName} className="form-control" name="firstname" id="firstname" placeholder="First name" />
            <input type="text" onChange={this.handleLastNameChange} value={this.state.lastName} className="form-control" name="lastname" id="lastname" placeholder="Last name" />
            <input type="text" onChange={this.handleEmailChange} value={this.state.email} className="form-control" name="email" id="email"  placeholder="Email" />
            <input type="password" onChange={this.handlePwdChange} value={this.state.password} className="form-control" id="password" ref="password" placeholder="Password" />
            <input type="password" onChange={this.handleConfirmChange} value={this.state.confirm} className="form-control" id="password" ref="password" placeholder="Confirm password" />

            <input type="submit" value="Sign Up" className="expanded button"/>
          </form>
      </div>
    );
  }
}

export default Signup;
