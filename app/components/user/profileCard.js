'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';
import {Link} from 'react-router'

class profileCard extends React.Component {
  constructor() {
    super()
  }

  // componentDidMount() {
  //   ExploreStore.addChangeListener(this._onChange);
  // }

  // componentWillUnmount() {
  //   ExploreStore.removeChangeListener(this._onChange);
  // }

  // This will be called when the user clicks on the login button
  render() {
    console.log("in cards")
    var photographer = this.props.photographer;
    var id = photographer._id;
    var profileLink = '/photographers/'+id;
    var coverImageLink = photographer.coverUrl;
    var avatarImageLink = photographer.avatarUrl;
    var name = photographer.firstName + " " + photographer.lastName;
    var location = photographer.locationString;

    var numReviews = photographer.numReviews

    var totalStars = 5
    var rating = photographer.rating;

    var stars = []
    for (var i = 1; i <= rating; i++) {
      stars.push(<i key = {i} className="fa fa-star"></i>)
    }
    if (rating - Math.floor(rating) >= 0.9) {
      stars.push(<i key={rating} className="fa fa-star"></i>)
    }
    else if (rating - Math.floor(rating) >= 0.4) {
      stars.push(<i key={rating} className="fa fa-star-half-o"></i>)
    }
    else {
      stars.push(<i key={rating} className="fa fa-star-o"></i>)
    }
    for (var i = Math.ceil(rating)+1; i <= totalStars; i++) {
      stars.push(<i key={i} className="fa fa-star-o"></i>)
    }

    var specialities = photographer.specialities;
    var labels = []
    for (var i = 0; i < photographer.specialities.length && i < 4; i++) {
      labels.push(<span key={i} className="label">{photographer.specialities[i]}</span>)
    }
    return (
      <div className="large-4 columns">
        <div className="profile-card">
          <Link to={profileLink}>
            <div className="container"><img src={coverImageLink}/></div>
            <div className="avatar small"><img src={avatarImageLink}/></div>
            <div className="profile-info">
              <h5>{name}</h5>
              <p><i className="fa fa-map-marker"></i>&nbsp; {location}&nbsp;&middot;
              <span className="rating">{stars}</span>
              ({numReviews})</p>
              <div className="specialty">
                {labels}<span className="label">...</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default profileCard;



