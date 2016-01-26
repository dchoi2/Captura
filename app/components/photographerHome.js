import React from 'react';
import {Link, browserHistory} from 'react-router'

class PhotographerHome extends React.Component {
  constructor() {
    super()
    this.submitForm = this.submitForm.bind(this);
    this.state = {message:''}
  }

  componentDidMount() {
    if (this.props.userLoggedIn) {
      browserHistory.push('/home')
    }
  }

  submitForm(e) {
    e.preventDefault()
    this.setState({message:"Invalid Credentials. If you've submitted an application, we'll get back to you soon!"})

  }

  render() {
    return (
      <div>
        <div className="callout large hero photographer-main">
          <h1>Capture for <em>Captura</em></h1>
          <h3>Join our growing community of photographers from all over the country.</h3>
          <Link to="/apply" className="primary button">Apply Now</Link>
        </div>

        <div id="how" className="row">
          <div className="large-4 columns">
            <span className="circle">1</span>
            <h2>Apply</h2>
            <p>The application is simple! We need to screen for qualified photographers to ensure quality experiences for clients.</p>
          </div>
          <div className="large-4 columns">
            <span className="circle">2</span>
            <h2>Complete Profile</h2>
            <p>Once approved, you can get started with Captura by updating your profile to best showcase your skills and specialties.</p>
          </div>
          <div className="large-4 columns">
            <span className="circle">3</span>
            <h2>Get Booked!</h2>
            <p>That{"\u0027"}s it! Once your profile is completed, you will show up on the "explore" page for clients to browse and book you to capture their moments.</p>
          </div>
        </div>

        <div id="login" className="callout medium photographer-login">
          <h3>Already have an account? Log In Here.</h3>
          <br/>
          {this.state.message ?
          <div className="callout alert">
            <p>{this.state.message}</p>
          </div>
          : null}
          <form id="login-form" name="login-form" onSubmit={this.submitForm}>
            <input type="text" name="email" id="email" placeholder="Email address"/>
            <input type="password" name="password" id="password" placeholder="Password"/>
            <input type="submit" value="Log In" className="expanded button"/>
          </form>
        </div>
      </div>

    )
  }
}

export default PhotographerHome;