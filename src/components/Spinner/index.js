import React, { Component } from 'react';
class Results extends Component {
  render() {
    return (
      <div>
        <p className="text-center"><i className="fa fa-spinner fa-pulse fa-spin"></i> {this.props.text || 'Searching for tracks...'}</p>
      </div>
    );
  }
}

export default Results;
