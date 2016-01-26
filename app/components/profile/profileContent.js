'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ProfileActions from '../../actions/profileActions'

class PhotographerContent extends React.Component {
  constructor() {
    super()
  }

  render() {

    var totalStars = 5

    var specialities = this.props.specialities;
    var labels = []
    for (var i = 0; i < specialities.length; i++) {
      labels.push(<span key={i} className="label">{specialities[i]}</span>)
    }
    var reviews =this.props.reviews;
    console.log(reviews)
    var reviewBoxes = []
    for (var r = 0; r <reviews.length; r++) {
      var review = reviews[r]
      var rating = review.rating;
      rating = 3

      var stars = []
      for (var i = 1; i <= rating; i++) {
        stars.push(<i key = {i + r} className="fa fa-star"></i>)
      }
      if (rating - Math.floor(rating) >= 0.9) {
        stars.push(<i key={rating + r + 1} className="fa fa-star"></i>)
      }
      else if (rating - Math.floor(rating) >= 0.4) {
        stars.push(<i key={rating + r + 2} className="fa fa-star-half-o"></i>)
      }
      else if (rating - Math.floor(rating) > 0) {
        stars.push(<i key={rating + r + 3} className="fa fa-star-o"></i>)
      }
      for (var i = Math.ceil(rating)+1; i <= totalStars; i++) {
        stars.push(<i key={i + r} className="fa fa-star-o"></i>)
      }

      reviewBoxes.push(
        <div key={r+"reviews"} className="review">
          <div className="review-avatar small">
            <img src={review.writer.avatarUrl} />
            <p><b>{review.writer.firstLastInitial}</b><br/>
            <span className="rating">
            {stars}
            </span></p>
          </div>
          <div className="review-text">
            <p>{review.content}</p>
          </div>
          <hr/>
        </div>

      )
    }


    return (
      <div>
        <div className="row section">
          <div className="medium-8 columns">
            <div className="profile-info">
              <div id="about">
                 <h4>About This Photographer</h4>
                 <p>{this.props.aboutMe}</p>
              </div>
              <div className="specialty clickable">
                <hr/>
                <h4>Specialties</h4>
                {labels}
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="reviews">
          <div className="medium-8 columns">
            <div className="profile-info">
              <hr/>
              <h4>Reviews</h4>
              {reviewBoxes}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotographerContent;