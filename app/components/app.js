import React from 'react';
import Navbar from './navbar/navbar.js'
import SessionStore from '../stores/sessionStore'

class App extends React.Component{
  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: SessionStore.isLoggedIn()
    }
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this)
    SessionStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount(){
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div className="container">
        <Navbar history={this.props.history}/>
        {this.props.children}
      </div>
    );
  }
};

export default App;