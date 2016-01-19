'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';

class Sorter extends React.Component {
  constructor() {
    super()
    this.state = ExploreStore.getInputState();
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.submitLocation = this.submitLocation.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    ExploreStore.addChangeListener(this._onChange);
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(LoginStore.getInputState());
    ReactDOM.findDOMNode(this.refs.focus).focus();
  }

  handleLocationChange(e) {
    this.setState({location: e.target.value});
  }

  // This will be called when the user clicks on the login button
  sortBy() {
    this.setState({sorting: "rate"})
  }

  render() {
    return (
        <div className="row sorting">
          <div className="medium-6 columns">
            <p className="show-for-medium">Showing <em>all</em> photographers</p>
          </div>
          <div className="medium-6 columns">
            <p className="text-right">Sort by: <p onClick={this.sortBy}>Top Rated</a> | <a href="#">Most Favorited</a> | <a href="#">Random</a></p>
          </div>
        </div>
    );
  }
}

export default Sorter;

// ReactMixin(Login.prototype, React.addons.LinkedStateMixin);



