import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom'

import Auth from '../../utils/Auth';
import Spotify from '../../utils/Spotify';
import Spinner from '../Spinner';
import CreateNewPlaylistForm from '../CreateNewPlaylistForm';
import CreateNewPlaylistSuccess from '../CreateNewPlaylistSuccess';

class CreateNewPlaylist extends Component {
  state = {loading: false, name: ''};

  componentWillMount() {
    if (!Auth.isLogged()) {
      return window.location.href = '/';
    }
  }

  _createNewPlaylist(playlistName) {
    const newPlaylist = Spotify.createPlaylist(playlistName)

    newPlaylist.then((playlist) => {
      this.setState({loading: true, playlistCreated: playlist});
      this._addSongsTo(playlist);
    });

    newPlaylist.catch((error) => {
      alert(error.error);
    });
  }

  _addSongsTo(playlist) {
    const tracks = JSON.parse(localStorage.getItem('playLists'));

    const addSongs = Spotify.addTracksToPlaylist(tracks, playlist)

    addSongs.then((json) => {
      this.setState({loading: false, success: true});
    });

    addSongs.catch((error) => {
      alert(error.error);
    });
  }

  render() {
    if (this.state.redirectTo)
      return (<Redirect to={{ pathname: this.state.redirectTo }}/>);

    if (this.state.loading)
      return (<Spinner />)

    if (this.state.success && this.state.playlistCreated) {
      return (
        <CreateNewPlaylistSuccess
          playlist={this.state.playlistCreated}
        />
      );
    }

    return (
      <CreateNewPlaylistForm
        _createNewPlaylist={this._createNewPlaylist.bind(this)}
      />
    );
  }
}

export default CreateNewPlaylist;
