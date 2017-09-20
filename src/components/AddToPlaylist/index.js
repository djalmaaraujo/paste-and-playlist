import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom'

import Auth from '../../utils/Auth';
import Spotify from '../../utils/Spotify';
import Spinner from '../Spinner';

class AddToPlaylist extends Component {
  state = {playlists: [], playlistsChanged: []};

  componentWillMount() {
    if (!Auth.isLogged()) {
      return window.location.href = '/';
    }

    this._fetchPlaylists();
  }

  _fetchPlaylists() {
    const playlists = Spotify.userPlaylists();

    playlists.then((userPlaylists) => {
      this.setState({playlists: userPlaylists});
      console.log(userPlaylists);
    });

    playlists.catch((error) => {
      alert(error.error);
    });
  }

  _addSongsTo(playlist) {
    const tracks = JSON.parse(localStorage.getItem('playLists'));

    this.setState({playlists: []});

    console.log('Adding songs to', tracks, playlist);

    Spotify.addTracksToPlaylist(tracks, playlist).then((json) => {
      console.log(json);
      const changed = this.state.playlistsChanged;
      changed.push(playlist.id);

      this.setState({playlistsChanged: changed});
      this._fetchPlaylists();
    });
  }

  render() {
     if (this.state.redirectTo)
      return (<Redirect to={{ pathname: this.state.redirectTo }}/>);

    if (this.state.playlists.length === 0) {
      return (
        <Spinner />
      )
    }

    const getItem = (playlist, item) => {
      return (
        <li className="list__item" key={item}>
          <div className="list__media">
            { (this.state.playlistsChanged.indexOf(playlist.id) === -1) ?
              <a onClick={() => { this._addSongsTo(playlist) }}><span className="fa fa-plus-circle fa-2x"></span> &nbsp;</a>
              :
              <span className="fa fa-check-circle color--spotify fa-2x">&nbsp;</span>
            }

            <img src={playlist.images[0].url} alt="Playlist thumbnail" className="list__mediaPlaylistThumbnail" />
          </div>

          <div className="list__details">
            <h5>{ playlist.name }</h5>
            { (this.state.playlistsChanged.indexOf(playlist.id) === -1) ?
              <p>{playlist.tracks.total} songs.</p>
            :
              <p className="color--spotify"><strong>You added songs to this playlist</strong></p>
            }
          </div>
        </li>
      );
    }

    return (
      <div>
        <section className="card card--primary">
          <header className="card__header">
            <h4>Add to existing playlists</h4>
          </header>

          <div className="card__content">
            <p>Select one or more of your <strong>{ this.state.playlists.length }</strong> playlists to add the selected tracks:</p>

            <div className="alert alert--bad">This is an irreversible action. If you add songs to a Spotify Playlist, this tool will not be able to remove them.</div>

            <br />

            <ul className="list">
              { this.state.playlists.map(getItem) }
            </ul>
            <div className="text-center">
              <br />

              <h4>Maybe you need a new playlist?</h4>

              <a onClick={() => { this.setState({redirectTo: '/create-new-playlist'}) }} className="button button--ok">Create a new playlist</a>
            </div>
          </div>
        </section>

        <br />

        <div className="text-center"><a href="/" className="button">Start over</a></div>
      </div>
    );
  }
}

export default AddToPlaylist;
