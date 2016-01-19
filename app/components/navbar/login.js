'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from '../../actions/sessionActions';
import {Link} from 'react-router';

class Login extends React.Component {
  constructor() {
    super()
    this.state = this.getInputState();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.login = this.login.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  _onChange() {
    this.setState(this.getInputState());
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  getInputState() {
    return {
      email: this._email,
      password: this._password,
      message: this._message
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePwdChange(e) {
    this.setState({password: e.target.value});
  }

  // This will be called when the user clicks on the login button
  login(e) {
    e.preventDefault();
    var loginData = {
      email: this.state.email,
      password: this.state.password
    }

    var that = this;
    SessionActions.userLogin(loginData, function(data) {
      that.setState({email:'', password:'',message: data.message})
      ReactDOM.findDOMNode(that.refs.focus).focus();
    })
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Login</h1>
          <h2>
            {this.state.message}
          </h2>
          <form id="signup-form" name="signup-form" role="form" onSubmit={this.login}>
            <input type="text" ref="focus" onChange={this.handleEmailChange} value={this.state.email} name="email" id="email" placeholder="Email Address" />
            <input type="password" onChange={this.handlePwdChange} value={this.state.password} name="password" id="password" ref="password" placeholder="Password" />
            <input type="submit" value="Log In" className="expanded button"/>
          </form>
          <p>{'Don\u0027t have an account yet\u003F'} <Link to='/signup'>Sign Up</Link></p>
      </div>
    );
  }
}

export default Login;