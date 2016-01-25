'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ProfileActions from '../../actions/profileActions'

class PhotographerTitle extends React.Component {
  constructor() {
    super()
  }

  render() {
    var totalStars = 5
    var rating = this.props.rating;

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

    console.log(this.props)

    var externalLinks =[]

    return (
      <div className="callout profile">
        <div className="row section">
          <div className="medium-8 columns">
            <div className="profile-top">
              <div className="avatar"><img src={this.props.avatarUrl}/></div>
              <div>
                <h3>{this.props.officialName}</h3>
              <p><i className="fa fa-map-marker"></i>&nbsp; {this.props.locationString}&nbsp;&middot;
              <a href="#ratings" className="rating">{stars}
              ({this.props.numReviews})</a>&nbsp;&middot;&nbsp;<i className="fa fa-heart"></i> ({this.props.numFavorites})</p>
                <div className="social">
                  <p> {this.props.portfolio ? <a href={this.props.portfolio} target="_blank"><i className="fa fa-globe"></i>&nbsp;&nbsp;</a>:null}
                      {this.props.facebook ? <a href={this.props.facebook} target="_blank"><i className="fa fa-facebook-official"></i>&nbsp;&nbsp;</a>:null}
                      {this.props.flickr ? <a href={this.props.flickr} target="_blank"><i className="fa fa-flickr"></i>&nbsp;&nbsp;</a>:null}
                      {this.props.instagram ? <a href={this.props.instagram} target="_blank"><i className="fa fa-instagram"></i></a>:null}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="medium-4 columns">
            <a className="expanded button">Request Quote</a>
            {this.props.favorited ?
            <a className="expanded alert button"><i className="fa fa-heart"></i> Favorited</a>
            :
            <a className="expanded hollow button"><i className="fa fa-heart-o"></i> Favorite</a>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PhotographerTitle;