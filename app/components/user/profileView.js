'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';
import ProfileCard from './profileCard';

class ProfileView extends React.Component {
  constructor() {
    super()
    this.state = ExploreStore.setProfileState()
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ExploreStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(ExploreStore.setProfileState())
    console.log("updating state")
  }

  render() {
    console.log("state:")
    console.log(this.state.profiles)
    var that = this
    var profileCards = this.state.profiles.map(function(p){
        return <ProfileCard key={p._id} {...that.props}  photographer={p}/>
    })


    return (
      <div className="row section">{profileCards}</div>
    );
  }
}

export default ProfileView;

