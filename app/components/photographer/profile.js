'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import PhotographerActions from '../../actions/photographerActions';
import PhotographerStore from '../../stores/photographerStore';

class PhotographerProfile extends React.Component {
  constructor() {
    super()
    this.state = PhotographerStore.getState();
  }

  componentDidMount() {
    PhotographerStore.addChangeListener(this._onChange);
    var id = this.props.params.id;
  }

  componentWillUnmount() {
    PhotographerStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.state = PhotographerStore.getState();
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

export default PhotographerProfile;