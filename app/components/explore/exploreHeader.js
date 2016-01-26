'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';

class exploreHeader extends React.Component {
  constructor() {
    super()
    this.state = {message: ''}
    this.state = ExploreStore.getLocation()
    //this.state = {location: ExploreStore.location}
    this._onChange = this._onChange.bind(this);
    this.submitLocation = this.submitLocation.bind(this)
  }

  componentDidMount() {
    ExploreStore.addChangeListener(this._onChange);
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(ExploreStore.getLocation())
    // ReactDOM.findDOMNode(this.refs.focus).focus()
  }

  // This will be called when the user clicks on the login button
  submitLocation(e) {
    e.preventDefault();
    var that = this;
    var loc = this.refs.focus.value.split(',');
    if (loc.length !== 2) {
      this.setState({message: "Location must be of format: City, State"})
      ReactDOM.findDOMNode(this.refs.focus).focus()
    }
    else {
      var city = loc[0].trim()
      var state = loc[1].trim()
      var country = "US"
      ExploreActions.searchLocation({city: city, state: state, country: country}, function(data) {
        that.setState({message: data.message})
      })
    }
  }

  render() {
    return (
      <div className="callout hero small explore">
        <form className="location" onSubmit={this.submitLocation}>
          <input ref="focus" onChange={this.handleLocationChange}  placeholder="Where is your next event?" type="text"/>
            {this.state.message ?
              <p className="help-text">{this.state.message}</p> : null
            }
          <input type="submit" className="button" value="Search"/>
        </form>
      </div>
    );
  }
}

export default exploreHeader;

