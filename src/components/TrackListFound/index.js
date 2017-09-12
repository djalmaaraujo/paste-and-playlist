import React, { Component } from 'react';
import './index.css';

class TrackListFound extends Component {
  render() {
    const trackItem = (item) => {
      return (
        <li className="list__item">
          <div className="list__media">
            <img src="https://philipwalton.github.io/solved-by-flexbox/images/kitten.jpg" alt="" />
          </div>

          <div className="list__details">
            <h5>{item}</h5>

            <ul>
              <li className="list__item--selected"><a href="/test" className="fa fa-play-circle"></a> <a href="/test" className="fa fa-minus-circle"></a> <span>Live at the albert hall</span></li>
              <li><a href="/test" className="fa fa-play-circle"></a> <a href="/test" className="fa fa-plus-circle"></a> <span>Live at the albert hall</span></li>
              <li><a href="/test" className="fa fa-play-circle"></a> <a href="/test" className="fa fa-plus-circle"></a> <span>Live at the albert hall</span></li>
            </ul>
          </div>
        </li>
      );
    }

    return (
      <div className="TrackListFound">
        <ul className="list">
          {this.props.tracks.map(trackItem)}
        </ul>
      </div>
    );
  }
}

export default TrackListFound;
