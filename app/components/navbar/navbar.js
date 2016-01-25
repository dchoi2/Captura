import React from 'react';
import {Link} from 'react-router';
import SessionStore from '../../stores/sessionStore';
import SessionActions from '../../actions/sessionActions'
//import NavbarActions from '../actions/navbarActions';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = SessionStore.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  }

  _onChange(state) {
    this.setState(SessionStore.getState());
  }

  logout(e) {
    e.preventDefault();
    SessionActions.logout();
  }
  render() {
    console.log("in Navbar: ", this.state.user)
    return (
      <div className="top-bar" id="main-menu">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text"><Link to='/'>Captura</Link></li>
          </ul>
        </div>
        {this.headerItems}
      </div>
    );
  }

  get headerItems() {
    if (!SessionStore.isLoggedIn()) {
      return (
          <div className="top-bar-right">
            <ul className="menu align-right">
              <li><Link to='/login' data-open="login-modal" > <i className="fa fa-lock"></i> Log In</Link></li>
              <li><Link to='/signup' data-open="signup-modal" >Sign Up</Link></li>
              <li><Link to="/photographers">Become a Photographer</Link></li>
            </ul>
          </div>
      )
    }
    else {
      return(
          <div className="top-bar-right">
            <ul className="menu align-right">
            <li><a onClick={this.logout}>Logout</a></li>
            <li><Link to={'/users/'+this.state.user._id}> <i className="fa fa-lock"></i>{this.state.user.firstName}</Link></li>
            </ul>
          </div>
      )
    }
  }
}

export default Navbar;