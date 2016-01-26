'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import PhotographerActions from '../../actions/photographerActions';
import {browserHistory} from 'react-router';
import Dropzone from 'react-dropzone';
import SessionStore from '../../stores/sessionStore'

class QuoteRequest extends React.Component {
  constructor() {
    super()
    this.state =  this.resetState()
    this.requestQuote = this.requestQuote.bind(this);
    this.useBusinessCheck = this.useBusinessCheck.bind(this)
  }

  resetState() {
    return {
      user: SessionStore.user
    };
  }

  useBusinessCheck(e) {
    this.setState({"useBusiness": !this.state.useBusiness})
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.email).focus();
  }

  // This will be called when the user clicks on the login button
  requestQuote(e) {
    e.preventDefault();
  }

  _changeSelection(id) {
    var state = this.state.data.map(function(d) {
      return {
        id: d.id,
        selected: (d.id === id ? !d.selected : d.selected)
      }
    })
    this.setState({data:state});
  }

  render() {

    return (
    <div>
      <div className="callout hero small photographer">
        <h3>Request A Quote</h3>
        <p>Fill out your event details below.</p>
      </div>

      <form id="request-form" name="request-form" action="#">
        <div className="row section">
          <div className="columns">
            <legend>Request to:</legend>
            <input type="text" placeholder="Photographer" value={this.state.photographer} disabled/>
            <legend>Date & Time:</legend>
          </div>
        </div>
        <div className="row">
          <div className="medium-4 columns">
            <label>Date<input type="date" ref='date'/></label>
          </div>
          <div className="medium-4 columns">
            <label>Time<input type="time" ref='time'/></label>
          </div>
          <div className="medium-4 columns">
            <label>Duration
              <select>
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
                <option value=">4">Over 4 Hours</option>
              </select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="columns">
            <legend>Event Details:</legend>
            <input type="text" placeholder="Event Name (Optional)" />
          </div>
        </div>
        <div className="row">
          <div className="medium-6 columns">
            <label>Event Type
              <select>
                <option value="wedding">Wedding</option>
                <option value="gala">Gala</option>
                <option value="networking">Networking</option>
                <option value="party">Party</option>
                <option value="performance">Performance</option>
                <option value="conference">Conference</option>
                <option value="sports">Sports</option>
                <option value="festival">Festival</option>
                <option value="private">Private</option>
                <option value="others">Others</option>
              </select>
            </label>
          </div>
          <div className="medium-6 columns">
            <label>Indoor/Outdoor
              <select>
                <option value="select">Select One</option>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
                <option value="mix">Mix of both</option>
              </select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="columns">
            <input type="text" placeholder="Event Street Address" />
            <input type="text" placeholder="Street Address 2 (Optional)" />
            <input type="text" placeholder="City, State, Zipcode" />
          </div>
        </div>
        <div className="row">
          <div className="columns">
            <legend>Notes (Optional)</legend>
            <textarea className="textbox" form="request-form" rows="4" placeholder="Additional notes (optional)" maxlength="1000"></textarea>
            <p className="help-text" id="notesHelpText">Limited to 1000 characters.</p>
          </div>
        </div>
        <div className="row section">
          <div className="columns">
            <p className="help-text" id="requestHelpText">Your request will be sent directly to this photographer and a copy will appear in the "My Requests" tab on your account page. You will be able to see updates and track your request there.</p>
            <input type="submit" className="button" value="Submit Request" /> <input type="submit" className="hollow button" value="Cancel" />
          </div>
        </div>
      </form>
      <br/>
    </div>


    );
  }
}

export default QuoteRequest;
