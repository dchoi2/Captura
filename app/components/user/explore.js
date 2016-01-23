import React from 'react';
import AuthenticatedComponent from '../authenticatedComponent';
import {Link} from 'react-router'
import ExploreHeader from './exploreHeader'
import ExploreStore from '../../stores/exploreStore'
import ExploreActions from '../../actions/exploreActions'
import Sorter from './sorter'
//import Filter from './filter'
import ProfileView from './profileView'

class Explore extends React.Component {
  constructor() {
    super()
    this.state = ExploreStore.setFullState()
    // this._onChange = this._onChange.bind(this);
    console.log("here in Explore")
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this)
    ExploreStore.addChangeListener(this.changeListener);
    ExploreActions.getPhotographers();
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(ExploreStore.setFullState())
  }

  render() {
    return (
      <div>
        <ExploreHeader location={this.state.location}/>
        <Sorter/>
        <ProfileView/>
      </div>
    )
  }
}

export default AuthenticatedComponent(Explore);