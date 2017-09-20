import React, { Component } from 'react';

const placeHolderText = `Example:\n\nCharles Bradley - Where Do We Go From Here?\nEddie Hope & The Mannish Boys - Fool No More\nLee Fields - Let's Talk it Over\nHenry Ford - Take Me for What I Am\nThe Heavy - Short Change Hero`;

export default class Paste extends Component {
  state = {tracks: ""}

  _handleChange({ target }) {
    this.setState({tracks: target.value});

    this.props._handleChange(target.value);
  }

  _submitSearch() {
    if (this.state.tracks.trim() === '') {
      this.tracksInput.focus();
      return alert('Paste your songs!');
    }

    this.props._submitSearch();
  }

  render() {
    return (
      <div>
        <section className="card card--primary card--example">
          <header className="card__header">
            <h4>Paste your list here</h4>
          </header>

          <div className="card__content">
            <p>Paste a list of songs with the pattern: <strong>artist name - song title</strong> in the textarea below:</p>

            <textarea
              value={this.state.tracks}
              ref={(value) => { this.tracksInput = value; }}
              onChange={this._handleChange.bind(this)}
              className="paste"
              autoFocus
              placeholder={placeHolderText}></textarea>

            <hr />

            <button
              className="button button--ok"
              onClick={this._submitSearch.bind(this)}
            >Start searching
            </button>
          </div>
        </section>
      </div>
    );
  }
}