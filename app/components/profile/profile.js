'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ProfileActions from '../../actions/profileActions';
import ProfileStore from '../../stores/profileStore';
import ProfileTitle from './profileTitle'
import ProfileContent from './profileContent'
import AuthenticatedComponent from '../authenticatedComponent';


class PhotographerProfile extends React.Component {
  constructor() {
    super()
    this.state = ProfileStore.getProfileState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    console.log("Mounted PhotographerProfile")
    this.changeListener = this._onChange.bind(this)
    ProfileStore.addChangeListener(this.changeListener);
    ProfileActions.getPhotographerProfileInfo(this.props.params.id);
  }

  componentWillUnmount() {
    ProfileStore.clearState();
    ProfileStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(ProfileStore.getProfileState());
    console.log("updating profilestore")
  }

  render() {
    console.log("profile: ",this.state)
    return (
      <div>
        <div className="container cover">
          <img src={this.state.coverUrl}/>
        </div>
        <ProfileTitle   avatarUrl={this.state.avatarUrl}
                        officialName={this.state.officialName}
                        numFavorites={this.state.numFavorites}
                        rating={this.state.rating}
                        numReviews={this.state.numReviews}
                        locationString={this.state.locationString}
                        favorited={this.state.favorited}
                        portfolio={this.state.portfolio}
                        facebook={this.state.facebook}
                        flickr={this.state.flickr}
                        instagram={this.state.instagram}/>
        <ProfileContent aboutMe={this.state.aboutMe}
                        specialities={this.state.specialities}
                        reviews={this.state.reviews}/>
      </div>
    );
  }
}

export default AuthenticatedComponent(PhotographerProfile);