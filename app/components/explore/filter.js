'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';
import SpecTools from '../../utils/specialitiesTools';

class Filter extends React.Component {
  constructor() {
    super()
    this.state = this.resetFilteredState();
    this._onChange = this._onChange.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.state.open = false;
  }

  resetFilteredState() {
    return {
      data: SpecTools.initCheckedState
    };
  }

  componentDidMount() {
    ExploreStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({location: this.state.location});
  }

  clearFilters(e) {
    e.preventDefault()
    console.log("clear Filters")
    this.setState({data: SpecTools.initCheckedState})
  }

  toggleFilter() {
    this.setState({open: !this.state.open})
  }

  submitFilters(e) {
    e.preventDefault();
    var specialities = this.state.data.filter(function(d) {
      return d.selected
    }).map(function(d) {
        return SpecTools.idToString[d.id]
    })

    console.log(specialities)
    var that = this
    ExploreActions.setFilters(specialities, function() {
      that.setState({message:data.message})
    })
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
    var isOpen = this.state.open
    if (isOpen) {
      var divStyle = {
        display: 'block'
      };
    }
    else {
      var divStyle = {
        display: "none"
      }
    }

    var that = this;

    var checks = SpecTools.getCheckBoxes(this.state.data, function(data_id){
      return that._changeSelection.bind(that, data_id)
    })

    var checkGroups = []
    for (var i = 0; i < checks.length; i+=3) {
      checkGroups.push(
          <div key={i} className="large-3 columns">
            {checks[i]}
            {checks[i+1]}
            {checks[i+2]}
          </div>
      )
    }

    return (
    <div className="row">
      <div className="columns">
        <ul className="accordion" >
          <li className={"accordion-item "+(isOpen ? "is-active":"")}>
            <a onClick={this.toggleFilter} role="tab" className="accordion-title" id="filter-heading" aria-controls="filter" aria-expanded={isOpen} aria-selected={isOpen}>Filters</a>
            <div id="filter" className="accordion-content" role="tabpanel" data-tab-content aria-labelledby="filter-heading" aria-hidden={!isOpen} style={divStyle}>
              <form id="filter-form" name="filter-form">
                <fieldset className="fieldset">
                  <legend>Specialties:</legend>
                  {checkGroups}
                </fieldset>
                  <input type="submit" className="button" value="Apply" onClick={this.submitFilters}/> <input type="submit" className="hollow button" value="Clear All" onClick={this.clearFilters}/>
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
