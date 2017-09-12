import React, { Component } from 'react';
import './index.css';

import TrackListFound from '../TrackListFound'

const TRACKS = [
  'Charles Bradley - Where Do We Go From Here?',
  'Eddie Hope & The Mannish Boys - Fool No More',
  'Lee Fields - Lets Talk it Over',
  'Henry Ford - Take Me for What I Am',
  'The Heavy - Short Change Hero'
];

class Results extends Component {
  render() {
    return (
      <div className="results">
        <section className="card card--primary">
          <header className="card__header">
            <h4>Results</h4>
          </header>

          <div className="card__content">
            <p>There are tracks with more than one result. Please select the version of the song you want. You can listen to the song preview. Once your are done, add to the list and at the end, add or created a new playlist.</p>

            <h4>Your list has 12 songs, we found 34 matches:</h4>

            <TrackListFound tracks={TRACKS} />

            <div className="text-center">
              <br />

              <h4>You selected <strong className="color--spotify">15</strong> tracks. What do you want to do?</h4>

              <a href="/test" className="button button--primary">Add to an existing playlist</a>
              <span>&nbsp; or &nbsp;</span>
              <a href="/test" className="button button--ok">Create a new playlist</a>
            </div>
          </div>
        </section>

        <br />

        <div className="text-center"><a href="paste.html" className="button">Ignore this list, paste again</a></div>
      </div>
    );
  }
}

export default Results;
