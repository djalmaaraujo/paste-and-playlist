import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom'

import './index.css';
import Auth from '../../utils/Auth';
import Paste from '../Paste';
import Results from '../Results';

class Search extends Component {
  state = { redirecTo: null, playList: [] }

  _submitSearch() {
    this.setState({ query: this.state.tracks.split("\n") });
  }

  _handleChange(tracks) {
    this.setState({ tracks: tracks });
  }

  _addToPlaylist(item) {
    const playList = this.state.playList;
    playList.push(item);

    this.setState({playList});
    console.log(playList);
  }

  _removeFromPlaylist(item) {
    const playList = this.state.playList;
    const newPlaylist = playList.filter((el) => {
      return el.id.toString() !== item.id.toString();
    });

    this.setState({newPlaylist});
    console.log(newPlaylist);
  }

  componentWillMount() {
    if (!Auth.isLogged()) {
      this.setState({ redirectTo: '/' });
    }
  }

  render() {
    if (this.state.redirectTo)
      return (<Redirect to={{ pathname: this.state.redirectTo }}/>);

    if (this.state.query)
      return (
        <Results
          query={ this.state.query }
          _addToPlaylist={this._addToPlaylist.bind(this)}
          _removeFromPlaylist={this._removeFromPlaylist.bind(this)}
          playList={this.state.playList}
        />
      );

    return (
      <Paste
        _handleChange={this._handleChange.bind(this)}
        _submitSearch={this._submitSearch.bind(this)}
      />
    );
  }
}

export default Search;
