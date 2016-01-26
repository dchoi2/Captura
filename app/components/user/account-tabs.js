import React from 'react';
import {Link} from 'react-router'
import AccountInfo from './account-info'
import AccountFavorites from './account-favorites'
import AccountRequests from './account-requests'

class AccountTabTypes extends React.Component {
  onClick(item) {
    this.props.onTabClick(item);
  }
  render() {
    console.log("here in accountTabTypes: ", this.props)
    var active = this.props.active;

    var items = this.props.items.map(function(item, index) {
      return (
        <li key={item.id} className={"tabs-title " + (active === item.id ? "is-active": "")}>
          <a aria-selected={(active === item.id ? "true" : 'false')} onClick={this.onClick.bind(this, item)}>
            {item.title}
          </a>
        </li>
      )
    }.bind(this));

    return (
      <ul className="tabs vertical" id="account-tabs" data-tabs>{items}</ul>
    )
  }
}

class AccountTabContent extends React.Component {
  render() {
    var active = this.props.active;
    var items = this.props.items.map(function(item) {
      return (
        <div key={item.id} className={"tabs-panel " + (active === item.id ? "is-active" : "")} >
          {item.content}
        </div>
      )
    });
    return (
      <div className="tabs-content vertical" data-tabs-content="example-vert-tabs">
        {items}
      </div>
    )
  }
}

class AccountTabs extends React.Component {
  constructor() {
    super()
    this.state = {
      tabs: [
        {title: 'My Requests', content: <AccountRequests/>, id:"requests"},
        {title: 'Favorites', content: <AccountFavorites/>, id:"favorites"},
        {title: 'Edit Info', content: <AccountInfo/>, id:"edit"}
      ],
      activeItemId: 'requests'
    }
    this.handleTabClick = this.handleTabClick.bind(this)
  }

  handleTabClick(item) {
    this.setState({activeItemId: item.id})
  }

  render() {
    console.log("in accounttabs: ", this.state)
    return (
      <div className="row section">
        <div className="medium-3 columns">
          <AccountTabTypes  items={this.state.tabs}
                            active={this.state.activeItemId}
                            onTabClick={this.handleTabClick} />
        </div>
        <div className="medium-9 columns">
          <AccountTabContent items={this.state.tabs}
                        active={this.state.activeItemId}/>
        </div>
      </div>
    )
  }
}


export default AccountTabs;