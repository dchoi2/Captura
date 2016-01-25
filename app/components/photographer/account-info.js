'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import Dropzone from 'react-dropzone';
import SpecTools from '../../utils/specialitiesTools';

class AccountInfo extends React.Component {
  constructor() {
    super()
    this.state =  this.resetState()
    this.signup = this.signup.bind(this);
    this.useBusinessCheck = this.useBusinessCheck.bind(this)
  }

  resetState() {
    return {
      useBusiness: false,
      message: '',
      data: SpecTools.initCheckedState
    };
  }

  useBusinessCheck(e) {
    this.setState({"useBusiness": !this.state.useBusiness})
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.email).focus();
  }

  // This will be called when the user clicks on the login button
  signup(e) {
    e.preventDefault()
    var loc = this.refs.location.value.split(',');
    if (this.refs.password.value !== this.refs.confirm.value) {
      this.setState({message: "Passwords don't match", password: '', confirm:''});
      ReactDOM.findDOMNode(this.refs.password).focus();
    }
    else if (this.state.useBusiness === true && this.refs.businessName.value ==='') {
      this.setState({message: "You selected to use a business name. Please provide one."})
      ReactDOM.findDOMNode(this.refs.businessName).focus();
    }
    else if (loc.length !==2) {
      this.setState({message: "Location must be of format: City, State"})
      ReactDOM.findDOMNode(this.refs.location).focus()
    }
    else {
      var city = loc[0].trim()
      var state = loc[1].trim()

      var loc = this.refs.location.value.split(',')
      var specialities = this.state.data.filter(function(d) {
        return d.selected
      }).map(function(d) {
          return SpecTools.idToString[d.id]
      })
      console.log(specialities)
      var applyData = {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        businessName: this.refs.businessName.value,
        useBusiness: this.state.useBusiness,
        email: this.refs.email.value,
        password: this.refs.password.value,
        city: city,
        state: state,
        specialities: specialities,
        portfolio: this.refs.portfolio.value,
      }
      var that = this;
      SessionActions.applyFor(applyData, function(data) {
        that.setState({message: data.message})
      })
    }
  }
  _changeSelection(id) {
    var state = this.state.data.map(function(d) {
      return {
        id: d.id,
        selected: (d.id === id ? !d.selected : d.selected)
      }
    })
    this.setState({data:state});
  }

  render() {
    console.log(this.state)
    var that = this;

    var checks = SpecTools.getCheckBoxes(this.state.data, function(data_id){
      return that._changeSelection.bind(that, data_id)
    })

    var checkGroups = []
    for (var i = 0; i < checks.length; i+=3) {
      checkGroups.push(
          <div className="large-3 columns">
            {checks[i]}
            {checks[i+1]}
            {checks[i+2]}
          </div>
      )
    }

    return (
    <div className="row section">
      <div className="medium-3 columns">
        <ul className="tabs vertical" id="account-tabs" data-tabs>
          <li className="tabs-title is-active"><a href="#bookings" aria-selected="true">My Bookings</a></li>
          <li className="tabs-title"><a href="#edit">Edit Info</a></li>
        </ul>
        </div>
        <div className="medium-9 columns">
        <div className="tabs-content vertical" data-tabs-content="example-vert-tabs">

          <div className="tabs-panel is-active" id="bookings">
            <h3>My Bookings</h3>
          </div>

          <div className="tabs-panel" id="edit">
            <h3>Edit Account Information</h3>
            <div className="callout success">
              <p>You{'\u0027'}ve successfully updated your profile! You can <a href="#">view it here</a>.</p>
            </div>
            <div className="callout alert">
              <p>Oh no! Something went wrong!</p>
            </div>
            <form id="photog-edit-profile-form" name="edit-profile-form" action="#">
              <div className="row">
                <div className="large-6 columns">
                  <legend>Profile Picture</legend>
                  <input type="submit" value="Upload" className="button"/>
                </div>
                <div className="large-6 columns">
                  <legend>Cover Photo</legend>
                  <input type="submit" value="Upload" className="button"/>
                </div>
              </div>
              <div className="row">
                <div className="columns">
                  <legend>First Name</legend>
                  <input type="text" name="firstname" id="firstname" placeholder="First name" value="John" />
                  <legend>Last Name</legend>
                  <input type="text" name="lastname" id="lastname" placeholder="Last name" value="Smith" />
                  <legend>Business Name (Optional)</legend>
                  <input type="text" name="lastname" id="bizname" placeholder="Business name (optional)" />
                  <input id="usebizname" type="checkbox"/><label htmlFor="usebizname">Use business name on Captura</label>
                  <p className="help-text" id="usebiznameHelpText">This means your business name appear in place of your full name.</p>
                  <legend>Location</legend>
                  <input type="text" name="location" id="location" placeholder="Location (City, State)" value="San Francisco, CA" />
                  <legend>Email Address</legend>
                  <input type="email" name="email" id="email" placeholder="Email address" value="me@johnsmithphotography.com"/>
                  <legend>Change Password</legend>
                  <input type="password" name="password" id="password" placeholder="Old Password"/>
                  <input type="password" name="password" id="password" placeholder="New Password"/>
                  <input type="password" name="password" id="password" placeholder="Confirm New Password"/>
                </div>
              </div>
              <div className="row">
                <div className="columns">
                  <legend>Link to Portfolio</legend>
                  <input type="url" name="portfolio" id="portfolio" placeholder="Portfolio URL" value="http://johnsmithphotography.com" />
                  <legend>Link to Facebook Page (Optional)</legend>
                  <input type="url" name="facebook" id="facebook" placeholder="Facebook Page URL (Optional)" />
                  <legend>Link to Instagram (Optional)</legend>
                  <input type="url" name="instagram" id="instagram" placeholder="Instagram Profile URL (Optional)" />
                  <legend>Link to Flickr (Optional)</legend>
                  <input type="url" name="flickr" id="flickr" placeholder="Flickr Profile URL (Optional)" />
                </div>
              </div>
              <div className="row about">
                <div className="columns">
                  <legend>About Me (Optional)</legend>
                  <p className="help-text" id="specialtyHelpText">Limited to 4000 characters.</p>
                  <textarea name="about" id="about" form="photog-edit-profile-form" rows="4" placeholder="Write something about yourself and your work (Optional)" maxlength="4000"></textarea>
                </div>
              </div>
              <div className="row">
                <div className="columns">
                  <legend>Specialties</legend>
                  <p className="help-text" id="specialtyHelpText">Select at least one.</p>
                </div>
              </div>
              <div className="row">
                <div className="large-6 columns">
                  <input id="portrait" type="checkbox"/><label htmlFor="portrait">Portrait</label><br/>
                  <input id="headshot" type="checkbox"/><label htmlFor="headshot">Headshot</label><br/>
                  <input id="events" type="checkbox"/><label htmlFor="events">Events</label><br/>
                  <input id="engagement" type="checkbox"/><label htmlFor="engagement">Engagement</label><br/>
                  <input id="wedding" type="checkbox"/><label htmlFor="wedding">Wedding</label><br/>
                  <input id="lifestyle" type="checkbox"/><label htmlFor="lifestyle">Lifestyle/Candid</label>
                </div>
                <div className="large-6 columns">
                  <input id="club" type="checkbox"/><label htmlFor="club">Club/Nightlife</label><br/>
                  <input id="concert" type="checkbox"/><label htmlFor="concert">Concert/Performance</label><br/>
                  <input id="commercial" type="checkbox"/><label htmlFor="commercial">Commercial</label><br/>
                  <input id="arch" type="checkbox"/><label htmlFor="arch">Real Estate/Architecture</label><br/>
                  <input id="sports" type="checkbox"/><label htmlFor="sports">Sports</label><br/>
                  <input id="nature" type="checkbox"/><label htmlFor="nature">Nature</label>
                </div>
              </div>
              <div className="row section">
                <div className="columns">
                  <input type="submit" value="Save" className="button"/> <input type="submit" value="Cancel" className="hollow button"/>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default AccountInfo

    //     <div>
    //   <div className="callout hero small photographer">
    //     <h3>Capture for Captura</h3>
    //     <p>Apply to be a photographer</p>
    //   </div>
    //   <form id="apply-form" name="apply-form" action="#" onSubmit={this.signup}>

    //     <div className="row section">
    //             {this.state.message ?
    //     <div scrollIntoView={true} className="callout alert">
    //       <p>{this.state.message}</p>
    //     </div> : null}
    //       <div className="columns">
    //         <legend>Account Information:</legend>
    //         <input type="email" ref="email" name="email" id="email" placeholder="Email address" required/>
    //         <input type="password" ref="password" name="password" id="password" placeholder="Password" required/>
    //         <input type="password" ref="confirm" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="columns">
    //         <legend>Personal Information:</legend>
    //         <input type="text" ref="firstName" name="firstname" id="firstname" placeholder="First name" required/>
    //         <input type="text" ref="lastName" name="lastname" id="lastname" placeholder="Last name" required/>
    //         <input type="text" ref="businessName" name="businesName" id="bizname" placeholder="Business name (optional)" />
    //         <input checked={this.state.useBusiness} onChange={this.useBusinessCheck} id="usebizname" type="checkbox"/><label htmlhtmlFor="usebizname">Use business name on Captura</label>
    //         <p className="help-text" id="usebiznameHelpText">This means your business name appear in place of your full name.</p>
    //         <input type="text" ref="location" name="location" id="location" placeholder="Location (City, State)" required/>
    //         <p className="help-text" id="locationHelpText">Where are you based? Please enter in this format: City, State (e.g. Boston, MA) </p>
    //         <input type="url" ref="portfolio" name="portfolio" id="portfolio" placeholder="Portfolio URL" required/>
    //         <p className="help-text" id="portfolioHelpText">To ensure quality experience for our clients, we need your portfolio to verify your work.</p>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="columns">
    //         <legend>specialities</legend>
    //         <p className="help-text" id="specialtyHelpText">Select at least one.</p>
    //       </div>
    //     </div>
    //     <div className="row">
    //     {checkGroups}
    //     </div>
    //     <div className="row section">
    //       <div className="columns">
    //         <p className="help-text" id="applyHelpText">After you submit, our team will review your application and notify you once your application has been approved. Once approved, you will be able to further customize your Captura profile to best showcase your skills and interests. Then, you{'\u0027'}re ready to be booked!</p>
    //         <input type="submit" value="Submit Application" className="button" />
    //       </div>
    //     </div>
    //   </form>
    // </div>