import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom'

import Auth from '../../utils/Auth';
import Spotify from '../../utils/Spotify';
import Spinner from '../Spinner';

class CreateNewPlaylist extends Component {
  state = {loading: false, name: ''};

  componentWillMount() {
    if (!Auth.isLogged()) {
      return window.location.href = '/';
    }
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

  _handleChange(event) {
    this.setState({name: event.target.value});
  }

  _createNewPlaylist() {
    if (this.state.name === '') {
      this.inputName.focus();
      return alert('Provide a playlist name!');
    }

    console.log('Creating a new playlist...', this.state.name);

    const newPlaylist = Spotify.createPlaylist(this.state.name)

    newPlaylist.then((playlist) => {
      this.setState({loading: true, playlistCreated: playlist});
      this._addSongsTo(playlist);
    });
  }

  _addSongsTo(playlist) {
    const tracks = JSON.parse(localStorage.getItem('playLists'));

    console.log('Adding songs to', tracks, playlist);

    Spotify.addTracksToPlaylist(tracks, playlist).then((json) => {
      this.setState({loading: false, success: true});
    });
  }

  render() {
    if (this.state.redirectTo)
      return (<Redirect to={{ pathname: this.state.redirectTo }}/>);

    if (this.state.loading) {
      return (
        <Spinner />
      )
    }

    if (this.state.success && this.state.playlistCreated) {
      const newPlaylistURL = this.state.playlistCreated.external_urls.spotify;

      return (
        <div>
          <section className="card card--primary">
            <header className="card__header">
              <h4>All Set!</h4>
            </header>

            <div className="card__content">
              <p>Playlist created successfully. Here's your link: <a target="_blank" className="color--spotify" href={newPlaylistURL}>{ newPlaylistURL }</a></p>
            </div>
          </section>

          <br />

          <div className="text-center"><a href="/" className="button">Start over</a></div>
        </div>
      );
    }

    return (
      <div>
        <section className="card card--primary">
          <header className="card__header">
            <h4>Create a new playlist</h4>
          </header>

          <div className="card__content">

            <br />
            <div className="alert alert--bad">This is an irreversible action. If you add songs to a Spotify Playlist, this tool will not be able to remove them.</div>

            <p>Fill the form below and all your selected tracks will be added to the new playlist. You are adding <strong>15</strong> selected tracks to this new list:</p>

            <div className="text-center">
              <div className="form__item">
                <input
                  type="text"
                  className="form__input"
                  ref={(input) => { this.inputName = input; }}
                  value={this.state.value}
                  onChange={this._handleChange.bind(this)}
                  placeholder="Playlist name"
                  autoFocus
                />
              </div>

              <p>* Your playlist will be private by default. You can change this in your Spotify settings later.</p>

              <button className="button button--ok" onClick={this._createNewPlaylist.bind(this)}>Create a new playlist</button>
            </div>
          </div>
        </section>

        <br />

        <div className="text-center"><a href="paste.html" className="button">Start over</a></div>
      </div>
    );
  }
}

export default CreateNewPlaylist;
