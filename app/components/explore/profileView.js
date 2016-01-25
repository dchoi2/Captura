'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';
import ProfileCard from './profileCard';

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function compareFavorites(a, b) {
  return b.favorites - a.favorites
}

function compareRating(a, b) { // need better rating system
  return b.rating - a.rating
}



function contains(specialities, filters) {
  for (var i = 0; i < filters.length; i++) {
    console.log(filters[i])
    if (specialities.indexOf(filters[i]) === -1) {
      return false
    }
  }
  return true;
}

class ProfileView extends React.Component {
  constructor() {
    super()
    this.state = ExploreStore.setFullState()
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ExploreStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(ExploreStore.setFullState())
  }

  render() {
    var profiles = this.state.profiles
    if (this.state.sortBy === 'random') {
      profiles = shuffle(this.state.profiles)
    }
    else if (this.state.sortBy === 'favorite' && this.state.sortHasChanged) {
      profiles.sort(compareFavorites);
    }
    else if (this.state.sortBy === 'rating' && this.state.sortHasChanged) {
      profiles.sort(compareRating)
    }

    var that = this
    var profileCards = profiles.map(function(p){
        //if {this.state.filters in p.specialities}
        if (that.state.filters.length ===0 || contains(p.specialities, that.state.filters)) {
          return <ProfileCard key={p._id} {...that.props}  photographer={p}/>
        }
    })

    return (
      <div className="row section">{profileCards}</div>
    );
  }
}

export default ProfileView;

