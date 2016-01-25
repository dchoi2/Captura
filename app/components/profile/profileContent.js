'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ProfileActions from '../../actions/profileActions'

// class PhotographerReviews extends React.Component {
//   constructor() {
//     super()
//   }

//   render() {
//     return (
//     <div className="row" id="reviews">
//       <div className="medium-8 columns">
//         <div className="profile-info">
//           <hr>
//           <h4>Reviews</h4>
//           <p>No reviews yet.</p>
//           <div className="review">
//             <div className="review-avatar small">
//               <img src="img/users/avatar/default.png" />
//               <p><b></b></p>
//             </div>
//             <div className="review-text">
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ipsum consequat, gravida ipsum eget, tristique risus. Vestibulum vel placerat erat, at convallis sapien. Maecenas lacus dolor, volutpat in venenatis ut, aliquet non orci.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ipsum consequat, gravida ipsum eget, tristique risus. Vestibulum vel placerat erat, at convallis sapien. Maecenas lacus dolor, volutpat in venenatis ut, aliquet non orci.</p>
//             </div>
//           </div>
//           <div className="review">
//             <div className="review-avatar small">
//               <img src="img/users/avatar/default.png" />
//               <p><b>Michael C.</b></p>
//             </div>
//             <div className="review-text">
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ipsum consequat, gravida ipsum eget, tristique risus. Vestibulum vel placerat erat, at convallis sapien. Maecenas lacus dolor, volutpat in venenatis ut, aliquet non orci.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     )
//   }
// }

class PhotographerContent extends React.Component {
  constructor() {
    super()
  }

  render() {

    var specialities = this.props.specialities;
    var labels = []
    for (var i = 0; i < specialities.length; i++) {
      labels.push(<span key={i} className="label">{specialities[i]}</span>)
    }

    var reviews =this.props.reviews;
    var reviewBoxes = []
    for (var i = 0; i <reviews.length; i++) {
      reviewBoxes.push(
        <div className="review">
          <div className="review-avatar small">
            <img src="img/users/avatar/default.png" />
            <p><b></b></p>
          </div>
          <div className="review-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ipsum consequat, gravida ipsum eget, tristique risus. Vestibulum vel placerat erat, at convallis sapien. Maecenas lacus dolor, volutpat in venenatis ut, aliquet non orci.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a ipsum consequat, gravida ipsum eget, tristique risus. Vestibulum vel placerat erat, at convallis sapien. Maecenas lacus dolor, volutpat in venenatis ut, aliquet non orci.</p>
          </div>
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

      </div>
    );
  }
}

export default PhotographerContent;