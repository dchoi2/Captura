'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';

class Filter extends React.Component {
  constructor() {
    super()
    this.state = ExploreStore.getLocationState();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ExploreStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(LoginStore.getLocationState());
  }

  // This will be called when the user clicks on the login button
  setFilters(e) {
    e.preventDefault();
    console.log(this.state.locationCityState)
    console.log(this.state.locationCheck)
  }

  render() {
    return (
    <div className="row">
      <div className="columns">
        <ul className="accordion" >
          <li className="accordion-item">
            <a href="#filter" role="tab" className="accordion-title" id="filter-heading" aria-controls="filter">Filters</a>
            <div id="filter" className="accordion-content" role="tabpanel" data-tab-content aria-labelledby="filter-heading">
              <form id="filter-form" name="filter-form">
                <fieldset className="fieldset">
                  <legend>Location:</legend>
                    <div className="large-4 columns">
                      <input type="text" placeholder="City, State" ref="locationCityState"/>
                    </div>
                    <div className="large-8 columns">
                      <input id="travel" type="checkbox" ref="locationCheck"/><label htmlFor="travel">Show those open for travel</label>
                    </div>
                </fieldset>
                <fieldset className="fieldset">
                  <legend>Availability:</legend>
                  <div className="large-4 columns">
                    <label>Date<input type="date" ref='availDate'/></label>
                  </div>
                  <div className="large-4 columns">
                    <label>Time<input type="time" ref='availTime'/></label>
                  </div>
                  <div className="large-4 columns" ref='availDur'>
                    <label>Duration
                      <select>
                        <option value="1">1 Hour</option>
                        <option value="2">2 Hours</option>
                        <option value="3">3 Hours</option>
                        <option value="4">4 Hours</option>
                        <option value=">4">Over 4 Hours</option>
                      </select>
                    </label>
                  </div>
                </fieldset>
                <fieldset className="fieldset">
                  <legend>Specialties:</legend>
                  <div className="large-3 columns">
                    <input id="portrait" type="checkbox" ref="sP"/><label htmlFor="portrait">Portrait</label><br/>
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
                  <input type="submit" className="button" value="Apply" onSubmit={this.setFilters}/> <input type="submit" className="hollow button" value="Clear All" onClick={this.clearFilters}/>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
    );
  }
}

export default Filter;
