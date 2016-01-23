'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import PhotographerActions from '../../actions/photographerActions';
import PhotographerStore from '../../stores/photographerStore';

class PhotographerProfileHeader extends React.Component {
  render() {
    return (
      <div className="container cover">
        <img src="img/users/cover/001.jpg"/>
      </div>
    )
  }
}


class PhotographerProfile extends React.Component {
  constructor() {
    super()
    this.state = PhotographerStore.getState();
  }

  componentDidMount() {
    console.log("Mounted PhotographerProfile")
    PhotographerStore.addChangeListener(this._onChange);
    var id = this.props.params.id;
  }

  componentWillUnmount() {
    PhotographerStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.state = PhotographerStore.getState();
  }

  render() {
    return (
    <div className="callout profile">
      <div className="row section">
        <div className="medium-8 columns">
          <div className="profile-top">
            <div className="avatar-small"><img src="img/users/avatar/001.jpg"/></div>
            <div>
              <h3>John Smith</h3>
              <p><i className="fa fa-map-marker"></i>&nbsp; San Francisco, CA&nbsp;&middot;
              <a href="#reviews" className="rating"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i>
              (81)</a></p>
              <div className="social">
                <p><a href="#"><i className="fa fa-link"></i></a>&nbsp;&nbsp;<a href="#"><i className="fa fa-facebook-official"></i></a>&nbsp;&nbsp;<a href="#"><i className="fa fa-flickr"></i></a></p>
              </div>
            </div>
          </div>
        </div>

        <div className="medium-4 columns text-right">
          <a className="expanded button">Request Quote</a>
          <a className="expanded hollow button"><i className="fa fa-heart-o"></i> Favorite</a>
        </div>

      </div>
    </div>
    );
  }
}

export default PhotographerProfile;