import React, { Component } from 'react';

class CreateNewPlaylistSuccess extends Component {
  render() {
    const newPlaylistURL = this.props.playlist.external_urls.spotify;

    return (
      <div>
        <section className="card card--primary">
          <header className="card__header">
            <h4>All Set!</h4>
          </header>

          <div className="card__content">
            <p>Playlist created successfully. Here's your link: <a target="_blank" className="color--spotify" href={newPlaylistURL}>{newPlaylistURL}</a></p>
          </div>
        </section>

        <br />

        <div className="text-center"><a href="/" className="button">Start over</a></div>
      </div>
    );
  }
}

export default CreateNewPlaylistSuccess;

