import React, { Component } from 'react';
import './index.css';

class ResultItem extends Component {
  _addToPlaylist(track) {
    this.props._addToPlaylist(track);
    track.selected = true;
  }

  _removeFromPlaylist(track) {
    this.props._removeFromPlaylist(track);
    track.selected = false;
  }

  render() {
    const getTrack = (track, index) => {
      return (
        <li key={index} className={track.selected ? 'list__item--selectedTrack' : ''}>
          <p>
            <span>{ track.selected && <span className="fa fa-check color--spotify"></span> } <strong className="color--spotify">{ track.name }</strong> — Album: <strong>{ track.album.name }</strong></span>
          </p>


          <div className="list__mediaTracksItem">
            { track.album &&
              <img src={track.album.images[0].url} alt="Album thumbnail" /> }

            <div className="player">
              <audio className="player__audio" src={ track.preview_url } controls></audio>
              <br />
              { !track.selected && <a className="player__button" onClick={() => { this._addToPlaylist(track) }}> <span className="fa fa-plus-circle"></span> Add to list</a> }
              { track.selected && <a className="player__button" onClick={() => { this._removeFromPlaylist(track) }}> <span className="fa fa-minus-circle"></span> Remove from list</a> }
            </div>
          </div>
          <hr />
        </li>
      );
    }

    const trackItem = (item, index) => {
      return (
        <li className="list__item" key={index}>
          <div className="list__details">
            <h5>{item.artist} - {item.title}</h5>

            <ul>
              { (item.data.items.length > 0) ?
                  item.data.items.map(getTrack) :
                  <li>No tracks found for this one here. <span className="color--spotify"><strong>:(</strong></span></li>
              }
            </ul>
          </div>
        </li>
      );
    }

    return (
      <div className="ResultItem">
        <ul className="list">
          {this.props.tracks.map(trackItem)}
        </ul>
      </div>
    );
  }
}

export default ResultItem;
