import React from 'react';
import AuthenticatedComponent from '../authenticatedComponent';
import {Link} from 'react-router'
import ExploreHeader from './exploreHeader'
import ExploreStore from '../../stores/exploreStore'
import ExploreActions from '../../actions/exploreActions'
//import Sorter from './sorter'
//import Filter from './filter'
import ProfileView from './profileView'

class Explore extends React.Component {
  constructor() {
    super()
    this.state = ExploreStore.setProfileState()
    this._onChange = this._onChange.bind(this);
    console.log("here in Explore")
  }

  componentDidMount() {
    ExploreStore.addChangeListener(this._onChange);
    ExploreActions.getPhotographers();
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.state = ExploreStore.setProfileState()
  }

  render() {
    return (
      <div>
        <ExploreHeader/>
        <ProfileView/>
      </div>
    )
  }
}

export default AuthenticatedComponent(Explore);