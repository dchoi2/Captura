'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import UserStore from '../../stores/userStore';
import {Link} from 'react-router'

class AccountRequests extends React.Component {
  constructor() {
    super()
    this.state = UserStore.getFavorites();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(UserStore.getFavorites())
  }

  render() {

    var favorites = this.state.favorites.map(function(phot, i) {
      return (
        <div key={i} className="small-12 large-6 columns">
          <div className="profile-card-mini">
            <Link to={"/photographers/profile/"+phot._id}>
              <div className="avatar small"><img src={"../" +phot.avatarUrl} /></div>
              <div className="profile-info">
                <h5>{phot.officialName}</h5>
                <p><i className="fa fa-map-marker"></i>&nbsp; {phot.locationString}</p>
              </div>
            </Link>
          </div>
        </div>
      )
    })


    return (
          <div className="tabs-panel is-active" id="requests">
            <h3>My Requests</h3>
            <div className="event-card">
              <div className="event-status"><b>Status: Pending Quote</b> (Event ID #0000000 - submitted on XX/XX/XXXX)</div>
              <div className="event-info">
                <div className="event-photographer">
                  <img src="../img/users/avatar/001.jpg" />
                  <h5>John Smith</h5>
                  <p><i className="fa fa-map-marker"></i>&nbsp; San Francisco, CA</p>
                </div>
                <div className="event-details">
                  <hr/>
                  <b>Name:</b> Max{'\u0027'}s Birthday<br/>
                  <b>Date:</b> 02/14/2016<br/>
                  <b>Time:</b> 11AM (2 Hours)<br/>
                  <b>Venue Type:</b> Private (Indoors)<br/>
                  <b>Address:</b> 123 This Street, San Francisco, CA 98765<br/>
                  <b>Notes:</b> None
                </div>
              </div>
              <div className="event-action">
                <em>No actions required yet.</em><br/>
                <a href="#">Cancel This Request</a>
              </div>
            </div>
          </div>
    );
  }
}

export default AccountRequests;

