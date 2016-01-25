'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import UserStore from '../../stores/userStore';
import {Link} from 'react-router'

class AccountFavorites extends React.Component {
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
      <div>
        <h3>Favorite Photographers</h3>
        <div className="row">
          {favorites}
        </div>
      </div>
    );
  }
}

export default AccountFavorites;

