'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';

class exploreHeader extends React.Component {
  constructor() {
    super()
    this.state = ExploreStore.getLocationState();
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.submitLocation = this.submitLocation.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ExploreStore.addChangeListener(this._onChange);
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(LoginStore.getLocationState());
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  handleLocationChange(e) {
    this.setState({location: e.target.value});
  }

  // This will be called when the user clicks on the login button
  submitLocation(e) {
    e.preventDefault();
    var loginData = {
      email: this.state.email,
      password: this.state.password
    }

    ExploreActions.login(loginData)
      .fail(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      })
  }

  render() {
    return (
      <div className="callout hero small explore">
        <div className="input-group small-centered location">
          <input className="input-group-field" ref="focus" onChange={this.handleLocationChange} placeholder="Where is your next event?" type="text"></input>
          <div className="input-group-button">
            <input type="submit" className="button" value="Submit" onClick={this.submitLocation}></input>
          </div>
        </div>
      </div>
    );
  }
}

export default exploreHeader;

