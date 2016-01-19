import React from 'react';
import AuthenticatedComponent from './authenticatedComponent';
import {Link} from 'react-router'

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="callout large hero">
          <h1><em>Live</em> in the moment.</h1>
          <h3>Leave the capturing to us.</h3>
          <button className="primary button"><Link to={this.props.userLoggedIn ? '/home' : '/signup'}>Get Started</Link></button>
        </div>

        <div id="how" className="row">
          <div className="large-4 columns">Step 1: Tell us your needs.</div>
          <div className="large-4 columns">Step 2: Browse and choose photographers.</div>
          <div className="large-4 columns">Step 3: Request a quote!</div>
        </div>

        <div className="callout medium photographer">
          <h2>Are you a photographer?</h2><button className="hollow button" >Apply Now</button>
        </div>
      </div>
    )
  }
}

export default AuthenticatedComponent(Home);