import React, { Component } from 'react';

class IrreversibleWarning extends Component {
  render() {
    return (
      <div>
        <div className="alert alert--bad">This is an irreversible action. If you add songs to a Spotify Playlist, this tool will not be able to remove them.</div>
      </div>
    );
  }
}

export default IrreversibleWarning;
