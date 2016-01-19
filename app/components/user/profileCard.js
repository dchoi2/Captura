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
    var profileLink = '/photographer/'+id;
    var coverImageLink = '/img/users/cover/'+photographer.coverImageLink;
    var avatarImageLink = '/img/users/cover/' + photographer.avatarImageLink;
    var name = photographer.firstName + " " + photographer.lastName;
    var location = photographer.location;

    var ratings = photographer.ratings;
    var stars = []
    for (var i = 0; i < ratings; i++) {
      stars.push(<i className="fa fa-star"></i>)
    }
    if (ratings - Math.floor(ratings) > 0.5) {
      stars.push(<i className="fa fa-star-half-o"></i>)
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
            <div className="avatar"><img src={avatarImageLink}/></div>
            <div className="profile-info">
              <h5>{name}</h5>
              <p><i className="fa fa-map-marker"></i>&nbsp; {location}&nbsp;&middot;
              <span className="rating">{stars}</span>
              (81)</p>
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



