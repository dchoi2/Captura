'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from '../../actions/sessionActions';
import {browserHistory} from 'react-router';
import Dropzone from 'react-dropzone';
import SpecTools from '../../utils/specialitiesTools';

class Apply extends React.Component {
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
    <div>
      <div className="callout hero small photographer">
        <h3>Capture for Captura</h3>
        <p>Apply to be a photographer</p>
      </div>
      <form id="apply-form" name="apply-form" action="#" onSubmit={this.signup}>

        <div className="row section">
                {this.state.message ?
        <div scrollIntoView={true} className="callout alert">
          <p>{this.state.message}</p>
        </div> : null}
          <div className="columns">
            <legend>Account Information:</legend>
            <input type="email" ref="email" name="email" id="email" placeholder="Email address" required/>
            <input type="password" ref="password" name="password" id="password" placeholder="Password" required/>
            <input type="password" ref="confirm" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />
          </div>
        </div>
        <div className="row">
          <div className="columns">
            <legend>Personal Information:</legend>
            <input type="text" ref="firstName" name="firstname" id="firstname" placeholder="First name" required/>
            <input type="text" ref="lastName" name="lastname" id="lastname" placeholder="Last name" required/>
            <input type="text" ref="businessName" name="businesName" id="bizname" placeholder="Business name (optional)" />
            <input checked={this.state.useBusiness} onChange={this.useBusinessCheck} id="usebizname" type="checkbox"/><label htmlFor="usebizname">Use business name on Captura</label>
            <p className="help-text" id="usebiznameHelpText">This means your business name appear in place of your full name.</p>
            <input type="text" ref="location" name="location" id="location" placeholder="Location (City, State)" required/>
            <p className="help-text" id="locationHelpText">Where are you based? Please enter in this format: City, State (e.g. Boston, MA) </p>
            <input type="url" ref="portfolio" name="portfolio" id="portfolio" placeholder="Portfolio URL" required/>
            <p className="help-text" id="portfolioHelpText">To ensure quality experience for our clients, we need your portfolio to verify your work.</p>
          </div>
        </div>
        <div className="row">
          <div className="columns">
            <legend>specialities</legend>
            <p className="help-text" id="specialtyHelpText">Select at least one.</p>
          </div>
        </div>
        <div className="row">
        {checkGroups}
        </div>
        <div className="row section">
          <div className="columns">
            <p className="help-text" id="applyHelpText">After you submit, our team will review your application and notify you once your application has been approved. Once approved, you will be able to further customize your Captura profile to best showcase your skills and interests. Then, you{'\u0027'}re ready to be booked!</p>
            <input type="submit" value="Submit Application" className="button" />
          </div>
        </div>
      </form>
    </div>


    );
  }
}
        //   <div className="columns">
        //     <legend>specialities</legend>
        //     <p className="help-text" id="specialtyHelpText">Select at least one.</p>
        //   </div>
        // </div>
        // <div className="row">
        //   <div className="large-3 columns">
        //     <input id="portrait" type="checkbox"/><label htmlFor="portrait">Portrait</label><br/>
        //     <input id="headshot" type="checkbox"/><label htmlFor="headshot">Headshot</label><br/>
        //     <input id="events" type="checkbox"/><label htmlFor="events">Events</label>
        //   </div>
        //   <div className="large-3 columns">
        //     <input id="engagement" type="checkbox"/><label htmlFor="engagement">Engagement</label><br/>
        //     <input id="wedding" type="checkbox"/><label htmlFor="wedding">Wedding</label><br/>
        //     <input id="lifestyle" type="checkbox"/><label htmlFor="lifestyle">Lifestyle/Candid</label>
        //   </div>
        //   <div className="large-3 columns">
        //     <input id="club" type="checkbox"/><label htmlFor="club">Club/Nightlife</label><br/>
        //     <input id="concert" type="checkbox"/><label htmlFor="concert">Concert/Performance</label><br/>
        //     <input id="commercial" type="checkbox"/><label htmlFor="commercial">Commercial</label>
        //   </div>
        //   <div className="large-3 columns">
        //     <input id="arch" type="checkbox"/><label htmlFor="arch">Real Estate/Architecture</label><br/>
        //     <input id="sports" type="checkbox"/><label htmlFor="sports">Sports</label><br/>
        //     <input id="nature" type="checkbox"/><label htmlFor="nature">Nature</label>
        //   </div>
        // </div>
export default Apply;

  // onDrop(files) {
  //   console.log(files)
  //   if (files[0].type !== 'image/jpeg') {
  //     console.log("file is not jpg")
  //   }
  //   this.setState({
  //     files: files
  //   })
  // }

  // onOpenClick() {
  //   this.refs.dropzone.open();
  // }
      // <div className="login jumbotron center-block">
      //   <h1>Apply to be a Photographer!</h1>
      //     <h2>
      //       {this.state.message}
      //     </h2>
      //     <form role="form" onSubmit={this.signup}>
      //       <input type="text" ref="firstName" className="form-control" name="firstname" id="firstname" placeholder="First name" />
      //       <input type="text" ref="lastName" className="form-control" name="lastname" id="lastname" placeholder="Last name" />
      //       <input type="text" ref="businessName" className="form-control" name="businessName" id="businessName" placeholder="Business name" />
      //       <input type="text"  ref = "email" className="form-control" name="email" id="email"  placeholder="Email" />
      //       <input type="password" className="form-control" id="password" ref="password" placeholder="Password" />
      //       <input type="password"  className="form-control" id="confirm" ref="confirm" placeholder="Confirm password" />
      //       <input type="text"  className="form-control" id="website" ref="website" placeholder="Portfolio Link" />
      //       <input type="text" className="form-control" id="facebook" ref="facebook" placeholder="Facebook Page"/>
      //       <input type="text" className="form-control" id="twitter" ref="twitter" placeholder="Twitter Page"/>
      //       <input type="text" className="form-control" id="instagram" ref="instagram" placeholder="Instagram Page"/>
      //       <input type="text" className="form-control" id="flickr" ref="flickr" placeholder="Flickr Page"/>
      //       <fieldset className="fieldset">
      //         <legend>specialities:</legend>
      //         <div className="large-3 columns">
      //           <input id="portrait" type="checkbox" onClick={this.test} ref="sP"/><label htmlhtmlFor="portrait">Portrait</label><br/>
      //           <input id="headshot" type="checkbox" ref="sH"/><label htmlhtmlFor="headshot">Headshot</label><br/>
      //           <input id="events" type="checkbox"  ref="sEv"/><label htmlhtmlFor="events">Events</label>
      //         </div>
      //         <div className="large-3 columns">
      //           <input id="engagement" type="checkbox" ref="sEn"/><label htmlhtmlFor="engagement">Engagement</label><br/>
      //           <input id="wedding" type="checkbox" ref="sW"/><label htmlhtmlFor="wedding">Wedding</label><br/>
      //           <input id="lifestyle" type="checkbox" ref="sL"/><label htmlhtmlFor="lifestyle">Lifestyle/Candid</label>
      //         </div>
      //         <div className="large-3 columns">
      //           <input id="club" type="checkbox" ref="sCl"/><label htmlhtmlFor="club">Club/Nightlife</label><br/>
      //           <input id="concert" type="checkbox" ref="sCon"/><label htmlhtmlFor="concert">Concert/Performance</label><br/>
      //           <input id="commercial" type="checkbox" ref="sCom"/><label htmlhtmlFor="commercial">Commercial</label>
      //         </div>
      //         <div className="large-3 columns">
      //           <input id="arch" type="checkbox" ref="sA"/><label htmlhtmlFor="arch">Real Estate/Architecture</label><br/>
      //           <input id="sports" type="checkbox" ref="sSp"/><label htmlhtmlFor="sports">Sports</label><br/>
      //           <input id="nature" type="checkbox" ref="sN"/><label htmlhtmlFor="nature">Nature</label>
      //         </div>
      //       </fieldset>
      //       <Dropzone ref="dropzone" onDrop={this.onDrop}>
      //           <div>Try dropping some files here, or click to select files to upload.</div>
      //       </Dropzone>
      //       <button type="button" onClick={this.onOpenClick}>
      //           Open Dropzone
      //       </button>
      //       {this.state.files.length > 0 ? <div>
      //       <h2>Uploading {this.state.files.length} files...</h2>
      //       <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
      //       </div> : null}
      //       <input type="submit" value="Sign Up" className="expanded button"/>
      //     </form>
      // </div>