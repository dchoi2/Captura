'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';

class exploreHeader extends React.Component {
  constructor() {
    super()
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
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  // This will be called when the user clicks on the login button
  submitLocation(e) {
    e.preventDefault();
    ExploreActions.searchLocation(this.refs.focus.value)
  }

  render() {
    return (
      <div className="callout hero small explore">
        <div className="input-group small-centered location">
          <form onSubmit={this.submitLocation}>
          <input className="input-group-field" ref="focus" onChange={this.handleLocationChange} placeholder="Where is your next event?" type="text"></input>
          <div className="input-group-button">
            <input type="submit" className="button" value="Submit" onClick={this.submitLocation}></input>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default exploreHeader;

