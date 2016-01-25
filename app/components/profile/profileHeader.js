'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

class PhotographerHeader extends React.Component {
  constructor() {
    super()
  }

  render() {
    console.log("here")
    return (
      <div className="container cover">
        <img src={this.props.coverUrl}/>
      </div>
    );
  }
}

export default PhotographerHeader;