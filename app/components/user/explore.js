import React from 'react';
import AuthenticatedComponent from '../authenticatedComponent';
import {Link} from 'react-router'
import ExploreHeader from './exploreHeader'
//import Sorter from './explore/sorter'
//import Filter from './explore/filter'
//import ProfileView from './explore/profileView'

class Explore extends React.Component {
  render() {
    return (
      <div>
        <ExploreHeader/>
      </div>
    )
  }
}

export default AuthenticatedComponent(Explore);