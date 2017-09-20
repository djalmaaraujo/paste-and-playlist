import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom'

import Auth from '../../utils/Auth';
import Spotify from '../../utils/Spotify';
import Spinner from '../Spinner';
import ResultItem from '../ResultItem';
import GuidGenerator from '../../utils/GuidGenerator';

import './index.css';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = { results: [], totalMatches: 0 };
  }

  componentWillMount() {
    if (!Auth.isLogged()) {
      return window.location.href = '/';
    }

    let totalMatches = this.state.totalMatches;

    this.props.query.map((line) => {
      const [ artist, title ] = line.split('-');

      const search = Spotify.search(artist, title);

      search.then((json) => {
        const results = this.state.results

        results.push({
          uid: GuidGenerator(),
          data: json.tracks,
          artist: artist.trim(),
          title: title.trim()
        });

        totalMatches += parseInt(json.tracks.total, 10);

        this.setState({results: this.state.results, totalMatches});
      });

      search.catch((error) => {
        alert(error);
      });

      return line;
    });
  }

  _addToExistingPlaylist() {
    this.setState({redirectTo: 'add_to_playlist'});
  }

  render() {
    const query = this.props.query;

    if (this.state.redirectTo)
      return (<Redirect to={{ pathname: this.state.redirectTo }}/>);

    if (this.state.results.length === 0) {
      return (
        <Spinner />
      )
    }

    return (
      <div className="results">
        <section className="card card--primary">
          <header className="card__header">
            <h4>Results</h4>
          </header>

          <div className="card__content">
            <p>Some tracks in your list has more than 1 match, but you can choose the version you want. This basically means that we found the same song in different albums, remixes, etc. Add one or more versions to your selected list.</p>

            <h4>Your list has {query.length} songs, we found {this.state.totalMatches} matches:</h4>

            <ResultItem
              _addToPlaylist={this.props._addToPlaylist.bind(this)}
              _removeFromPlaylist={this.props._removeFromPlaylist.bind(this)}
              tracks={this.state.results}
            />

            <div className="text-center">
              <br />

              <h4>You selected <strong className="color--spotify">{this.props.playList.length}</strong> tracks. What do you want to do?</h4>

              <a className="button button--primary" onClick={this._addToExistingPlaylist.bind(this)}>Add to an existing playlist</a>
              <span>&nbsp; or &nbsp;</span>
              <a className="button button--ok" onClick={this._addToExistingPlaylist.bind(this)}>Create a new playlist</a>
            </div>
          </div>
        </section>

        <br />

        <div className="text-center"><a href="/search" className="button">Ignore this list, paste again</a></div>
      </div>
    );
  }
}

export default Results;
