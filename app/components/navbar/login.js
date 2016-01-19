'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from '../../actions/sessionActions';
import LoginStore from '../../stores/loginStore';

class Login extends React.Component {
  constructor() {
    super()
    this.state = LoginStore.getInputState();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.login = this.login.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange);
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(LoginStore.getInputState());
    console.log(this.state)
    ReactDOM.findDOMNode(this.refs.focus).focus();
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

    SessionActions.login(loginData)
      .fail(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
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
      </div>
    );
  }
}

export default Login;