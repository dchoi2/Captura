import React from 'react';
import AuthenticatedComponent from '../authenticatedComponent';
import {Link} from 'react-router'
import UserStore from '../../stores/userStore'
import UserActions from '../../actions/userActions'
import AccountHeader from './account-header'
import AccountTabs from './account-tabs'

class UserAccount extends React.Component {
  constructor() {
    super()
    this.state = UserStore.setFullState()

    console.log("here in UserAccount")
  }

  // componentWillMount() {
  //   UserActions.getUserAccountInfo(this.props.params.id);
  // }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this)
    UserStore.addChangeListener(this.changeListener);
    UserActions.getUserAccountInfo(this.props.params.id);

  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(UserStore.setFullState())
  }

  _onTabClick(type) {
    this.setState({active: type})
  }

  render() {
    console.log("state: ",this.state)
    var headerInfo = this.state.headerInfo;
    return (
      <div>
        <AccountHeader  fullName={headerInfo ? headerInfo.fullName : ""}
                        avatarUrl={headerInfo ? headerInfo.avatarUrl : ''} />
        <AccountTabs  firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      avatarBase={this.state.avatarBase}
                      avatarUrl={this.state.avatarUrl}
                      favorites={this.state.favorites}
                      requests={this.state.requests}
                      reviews={this.state.reviews}/>
      </div>
    )
  }
}

export default AuthenticatedComponent(UserAccount);