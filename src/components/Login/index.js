import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import './index.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {logged: false};
  }
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  _getHashParams() {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);

    while (e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
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

    const redirect_uri = 'http://localhost:3000/auth'; // Your redirect uri

    const state = this._generateRandomString(16);

    const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative';

    let url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(state)}`

    window.location = url;
  }

  componentWillMount() {
    const tokenExists = localStorage.getItem('pnp_auth_token') || false;
    const expiresTime = parseInt(localStorage.getItem('pnp_auth_token_expiration_time'), 10) || false;

    if (tokenExists) {
      const now = new Date().getTime();
      const status = (expiresTime <= now) ? true : false;

      if (status === false) {
        localStorage.removeItem('pnp_auth_token');
        localStorage.removeItem('pnp_auth_token_expiration_time');
      }

      this.setState({logged: status});
    }

  }

  componentDidMount() {
    const params = this._getHashParams();

    if (params.access_token) {
      localStorage.setItem('pnp_auth_token', params.access_token);
      localStorage.setItem('pnp_auth_token_expiration_time', new Date().getTime() + parseInt(params.expires_in, 10));
      this.setState({logged: true})
    }
  }

  render() {
    if (this.state.logged) {
      return (<Redirect to={{pathname: '/paste'}}/>);
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
