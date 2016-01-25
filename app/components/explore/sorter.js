'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ExploreActions from '../../actions/exploreActions';
import ExploreStore from '../../stores/exploreStore';

class Sorter extends React.Component {
  constructor() {
    super()
    this.state = ExploreStore.getSortState();
    // this._onChange = this._onChange.bind(this);
    this.sortBy = this.sortBy.bind(this)
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this)
    ExploreStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ExploreStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(ExploreStore.getSortState());
  }

  // This will be called when the user clicks on the login button
  sortBy(e) {
    ExploreActions.setSort(e.target.getAttribute('data-value'))
  }

  render() {
    return (
      <div className="row sorting">
        <div className="medium-6 columns">
          <p className="show-for-medium">Showing <em>all</em> photographers</p>
        </div>
        <div className="medium-6 columns">
          <p className="text-right">Sort by: <a data-value='rate' onClick={this.sortBy}>Top Rated</a> | <a data-value='favorite' onClick={this.sortBy}>Most Favorited</a> | <a data-value='random' onClick={this.sortBy}>Random</a></p>
        </div>
      </div>
    );
  }
}

export default Sorter;

// ReactMixin(Login.prototype, React.addons.LinkedStateMixin);



