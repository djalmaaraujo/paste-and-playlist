import React, { Component } from 'react';

import IrreversibleWarning from '../IrreversibleWarning';

class CreateNewPlaylistForm extends Component {
  state = {name: ''};

  _handleChange(event) {
    this.setState({name: event.target.value});
  }

  _createNewPlaylist() {
    if (this.state.name === '') {
      this.inputName.focus();
      return alert('Provide a playlist name!');
    }

    this.props._createNewPlaylist(this.state.name);
  }

  render() {
    return (
      <div>
        <section className="card card--primary">
          <header className="card__header">
            <h4>Create a new playlist</h4>
          </header>

          <div className="card__content">

            <br />
            <IrreversibleWarning />

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

        <div className="text-center"><a href="/" className="button">Start over</a></div>
      </div>
    );
  }
}

export default CreateNewPlaylistForm;
