import React, { Component } from 'react';
import './index.css';

class Paste extends Component {
  render() {
    return (
      <section className="card card--primary card--example">
        <header className="card__header">
          <h4>Paste your list here</h4>
        </header>

        <div className="card__content">
          <p>Paste a list of songs with the pattern: <strong>artist name - song title</strong> in the textarea below:</p>

          <textarea name="" className="paste" autofocus placeholder="Example:

    Charles Bradley - Where Do We Go From Here?
    Eddie Hope & The Mannish Boys - Fool No More
    Lee Fields - Let's Talk it Over
    Henry Ford - Take Me for What I Am
    The Heavy - Short Change Hero"></textarea>

          <hr />

          <a href="index.html" className="button">Logout</a>
          <button className="button button--ok"  onclick="window.location.href='results.html'">Start searching</button>
        </div>
      </section>
    );
  }
}

export default Paste;
