/*global location*/
/*eslint no-restricted-globals: ["error", "location"]*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import './index.css';
import Auth from '../../utils/Auth';
import Spotify from '../../utils/Spotify';

const PUBLIC_URL = (!!process.env.PUBLIC_URL) ? process.env.PUBLIC_URL : 'http://localhost:3000'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {logged: false};
  }
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  _getHashParams(key) {
    const matches = window.location.hash.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
  }

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  _generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  _requestLogin() {
    const CLIENT_ID = 'adaa1a91c2374e518aef36993979e33a';

    const redirect_uri = `${PUBLIC_URL}/auth`; // Your redirect uri

    const state = this._generateRandomString(16);

    const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative';

    let url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(state)}`

    window.location = url;
  }

  componentWillMount() {
    const status = Auth.isLogged();

    this.setState({ logged: status });
  }

  componentDidMount() {
    const access_token = this._getHashParams('access_token');

    if (access_token) {
      const params = {
        access_token,
        expires_in: this._getHashParams('expires_in')
      };

      Auth.login(params);
      const me = Spotify.me()

      me.then((me) => {
        Auth.login(Object.assign(params, me));
        this.setState({logged: true})
      });
    }
  }

  render() {
    if (this.state.logged) {
      return (<Redirect to={{pathname: '/search'}}/>);
    }

    return (
      <div className="Login text-center">
        <p>Paste a list of songs with the pattern: <strong>Iron Maiden - Run to the hills</strong> (artist name - song title) and the tool will try to create a playlist with the spotify tracks found. You can choose to add the results to an existing playlist or create a new one.</p>

        <button
          type="button"
          className="button button--ok button--login"
          onClick={this._requestLogin.bind(this)}>
          Login with your Spotify account
        </button>
      </div>
    );
  }
}

export default Login;
