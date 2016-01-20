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
          <Link to={this.props.userLoggedIn ? '/home' : '/signup'} className="primary button">Get Started</Link>
        </div>

        <div id="how" className="row">
          <div className="large-4 columns">
            <span className="circle">1</span>
            <h2>Tell us your needs.</h2>
            <p>Specify when and where you want your moments captured, so you can enjoy the moment worry-free.</p>
          </div>
          <div className="large-4 columns">
            <span className="circle">2</span>
            <h2>Browse photographers.</h2>
            <p>Explore photographers in your area by ratings, specialties, and styles. Choose ones that best reflect your personality - it{'\u0027'}s your pick! </p>
          </div>
          <div className="large-4 columns">
            <span className="circle">3</span>
            <h2>Request a quote.</h2>
            <p>Easily send a request to your favorite photographers for a quote with your event details. That{'\u0027'}s it!</p>
          </div>
        </div>

        <div className="callout medium photographer">
          <h2>Are you a photographer?</h2><button className="hollow button"><Link to='/apply'>Apply Now</Link></button>
        </div>
      </div>
    )
  }
}

export default AuthenticatedComponent(Home);