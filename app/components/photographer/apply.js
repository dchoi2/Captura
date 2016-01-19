'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from '../../actions/sessionActions';
import {browserHistory} from 'react-router';
import Dropzone from 'react-dropzone';

class Apply extends React.Component {
  constructor() {
    super()
    this.state =  {
      avatar: null,
      coverPhoto: null,
      files: []
    }
    this.signup = this.signup.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.test = this.test.bind(this);
    //this._onChange = this._onChange.bind(this);
  }



  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.firstName).focus();
  }

  onDrop(files) {
    console.log(files)
    if (files[0].type !== 'image/jpeg') {
      console.log("file is not jpg")
    }
    this.setState({
      files: files
    })
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  test() {
    console.log(this.refs.sP)
  }

  // This will be called when the user clicks on the login button
  signup(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirm) {
      this.setState({message: "Passwords don't match"});
    }
    else {
      console.log(this.refs.sP.value)
      console.log(this.refs.sH.value)
      var applyData = {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        businessName: this.refs.businessName.value,
        email: this.refs.email.value,
        password: this.refs.password.value,
      }
      var that = this;
      SessionActions.applyFor(applyData, function(data) {
        that.setState({message: data.message})
      })
    }
  }

  render() {

    return (
      <div className="login jumbotron center-block">
        <h1>Apply to be a Photographer!</h1>
          <h2>
            {this.state.message}
          </h2>
          <form role="form" onSubmit={this.signup}>
            <input type="text" ref="firstName" className="form-control" name="firstname" id="firstname" placeholder="First name" />
            <input type="text" ref="lastName" className="form-control" name="lastname" id="lastname" placeholder="Last name" />
            <input type="text" ref="businessName" className="form-control" name="businessName" id="businessName" placeholder="Business name" />
            <input type="text"  ref = "email" className="form-control" name="email" id="email"  placeholder="Email" />
            <input type="password" className="form-control" id="password" ref="password" placeholder="Password" />
            <input type="password"  className="form-control" id="confirm" ref="confirm" placeholder="Confirm password" />
            <input type="text"  className="form-control" id="website" ref="website" placeholder="Portfolio Link" />
            <input type="text" className="form-control" id="facebook" ref="facebook" placeholder="Facebook Page"/>
            <input type="text" className="form-control" id="twitter" ref="twitter" placeholder="Twitter Page"/>
            <input type="text" className="form-control" id="instagram" ref="instagram" placeholder="Instagram Page"/>
            <input type="text" className="form-control" id="flickr" ref="flickr" placeholder="Flickr Page"/>
            <fieldset className="fieldset">
              <legend>Specialties:</legend>
              <div className="large-3 columns">
                <input id="portrait" type="checkbox" onClick={this.test} ref="sP"/><label htmlFor="portrait">Portrait</label><br/>
                <input id="headshot" type="checkbox" ref="sH"/><label htmlFor="headshot">Headshot</label><br/>
                <input id="events" type="checkbox"  ref="sEv"/><label htmlFor="events">Events</label>
              </div>
              <div className="large-3 columns">
                <input id="engagement" type="checkbox" ref="sEn"/><label htmlFor="engagement">Engagement</label><br/>
                <input id="wedding" type="checkbox" ref="sW"/><label htmlFor="wedding">Wedding</label><br/>
                <input id="lifestyle" type="checkbox" ref="sL"/><label htmlFor="lifestyle">Lifestyle/Candid</label>
              </div>
              <div className="large-3 columns">
                <input id="club" type="checkbox" ref="sCl"/><label htmlFor="club">Club/Nightlife</label><br/>
                <input id="concert" type="checkbox" ref="sCon"/><label htmlFor="concert">Concert/Performance</label><br/>
                <input id="commercial" type="checkbox" ref="sCom"/><label htmlFor="commercial">Commercial</label>
              </div>
              <div className="large-3 columns">
                <input id="arch" type="checkbox" ref="sA"/><label htmlFor="arch">Real Estate/Architecture</label><br/>
                <input id="sports" type="checkbox" ref="sSp"/><label htmlFor="sports">Sports</label><br/>
                <input id="nature" type="checkbox" ref="sN"/><label htmlFor="nature">Nature</label>
              </div>
            </fieldset>
            <Dropzone ref="dropzone" onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            <button type="button" onClick={this.onOpenClick}>
                Open Dropzone
            </button>
            {this.state.files.length > 0 ? <div>
            <h2>Uploading {this.state.files.length} files...</h2>
            <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
            </div> : null}
            <input type="submit" value="Sign Up" className="expanded button"/>
          </form>
      </div>
    );
  }
}

export default Apply;


          // <form role="form" onSubmit={this.signup}>
          //   <input type="text" ref="firstName" className="form-control" name="firstname" id="firstname" placeholder="First name" />
          //   <input type="text" ref="lastName" className="form-control" name="lastname" id="lastname" placeholder="Last name" />
          //   <input type="text" className="form-control" name="businessName" id="businessName" placeholder="Business name" />
          //   <input type="text"  ref = "email" className="form-control" name="email" id="email"  placeholder="Email" />
          //   <input type="password" className="form-control" id="password" ref="password" placeholder="Password" />
          //   <input type="password"  className="form-control" id="confirm" ref="confirm" placeholder="Confirm password" />
          //   <input type="text"  className="form-control" id="website" ref="website" placeholder="Portfolio Link" />
          //   <input type="text" className="form-control" id="facebook" ref="facebook" placeholder="Facebook Page"/>
          //   <input type="text" className="form-control" id="twitter" ref="twitter" placeholder="Twitter Page"/>
          //   <input type="text" className="form-control" id="instagram" ref="instagram" placeholder="Instagram Page"/>
          //   <input type="text" className="form-control" id="flickr" ref="flickr" placeholder="Flickr Page"/>
          //   <fieldset className="fieldset">
          //     <legend>Specialties:</legend>
          //     <div className="large-3 columns">
          //       <input id="portrait" type="checkbox" ref="sP"/><label htmlFor="portrait">Portrait</label><br/>
          //       <input id="headshot" type="checkbox" ref="sH"/><label htmlFor="headshot">Headshot</label><br/>
          //       <input id="events" type="checkbox"  ref="sEv"/><label htmlFor="events">Events</label>
          //     </div>
          //     <div className="large-3 columns">
          //       <input id="engagement" type="checkbox" ref="sEn"/><label htmlFor="engagement">Engagement</label><br/>
          //       <input id="wedding" type="checkbox" ref="sW"/><label htmlFor="wedding">Wedding</label><br/>
          //       <input id="lifestyle" type="checkbox" ref="sL"/><label htmlFor="lifestyle">Lifestyle/Candid</label>
          //     </div>
          //     <div className="large-3 columns">
          //       <input id="club" type="checkbox" ref="sCl"/><label htmlFor="club">Club/Nightlife</label><br/>
          //       <input id="concert" type="checkbox" ref="sCon"/><label htmlFor="concert">Concert/Performance</label><br/>
          //       <input id="commercial" type="checkbox" ref="sCom"/><label htmlFor="commercial">Commercial</label>
          //     </div>
          //     <div className="large-3 columns">
          //       <input id="arch" type="checkbox" ref="sA"/><label htmlFor="arch">Real Estate/Architecture</label><br/>
          //       <input id="sports" type="checkbox" ref="sSp"/><label htmlFor="sports">Sports</label><br/>
          //       <input id="nature" type="checkbox" ref="sN"/><label htmlFor="nature">Nature</label>
          //     </div>
          //   </fieldset>
          //   <Dropzone ref="dropzone" onDrop={this.onDrop}>
          //       <div>Try dropping some files here, or click to select files to upload.</div>
          //   </Dropzone>
          //   <button type="button" onClick={this.onOpenClick}>
          //       Open Dropzone
          //   </button>
          //   {this.state.files.length > 0 ? <div>
          //   <h2>Uploading {this.state.files.length} files...</h2>
          //   <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
          //   </div> : null}
          //   <input type="submit" value="Sign Up" className="expanded button"/>
          // // </form>