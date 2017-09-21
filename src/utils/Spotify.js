import Auth from './Auth';

const BASE_URL = 'https://api.spotify.com/v1';

const requestMethod = (url, options) => {
  return fetch(url, Object.assign({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Auth.token()}`
    }
  }, options));
}

const Spotify = {
  search(artist, title) {
    let SEARCH_URL = `${BASE_URL}/search?type=track`;

    SEARCH_URL += '&q=';
    SEARCH_URL += `artist:%22${encodeURIComponent(artist)}%22%20track:%22${encodeURIComponent(title)}%22`;

    return new Promise((resolve, reject) => {
      const request = requestMethod(SEARCH_URL);

      request.then((response) => {
        if (!response.ok) {
          reject({
            code: response.status,
            error: response.statusText
          });
        }

        response.json().then((json) => {
          resolve(json);
        });
      }, (error) => {
        reject({code: null, error: error.message})
      });
    });
  },

  // Showing max of 50 playlists for now
  userPlaylists() {
    let PLASYLISTS_URL = `${BASE_URL}/me/playlists?limit=50`;

    return new Promise((resolve, reject) => {
      const request = requestMethod(PLASYLISTS_URL);

      request.then((response) => {
        if (!response.ok) {
          reject({
            code: response.status,
            error: response.statusText
          });
        }

        response.json().then((json) => {
          resolve(json.items);
        });
      }, (error) => {
        reject({code: null, error: error.message})
      });
    });
  },

  // Showing max of 50 playlists for now
  addTracksToPlaylist(tracks, playlist) {
    let ADD_TO_PLAYLIST_URL = `${BASE_URL}/users/${playlist.owner.id}/playlists/${playlist.id}/tracks`;

    return new Promise((resolve, reject) => {
      const request = requestMethod(ADD_TO_PLAYLIST_URL, {
        method: 'POST',
        body: JSON.stringify({
          uris: tracks.map((t) => {return t.uri})
        })
      });

      request.then((response) => {
        if (!response.ok) {
          reject({
            code: response.status,
            error: response.statusText
          });
        }

        response.json().then((json) => {
          resolve(json);
        });
      }, (error) => {
        reject({code: null, error: error.message})
      });
    });
  },

  createPlaylist(playlistName) {
    let CREATE_PLAYLIST_URL = `${BASE_URL}/users/${Auth.me().id}/playlists`;

    return new Promise((resolve, reject) => {
      const request = requestMethod(CREATE_PLAYLIST_URL, {
        method: 'POST',
        body: JSON.stringify({
          name: playlistName,
          public: false,
          description: `Created using paste'n'Playlist!. Create yours too: https://pasteandplaylist.now.sh/`
        })
      });

      request.then((response) => {
        if (!response.ok) {
          reject({
            code: response.status,
            error: response.statusText
          });
        }

        response.json().then((json) => {
          resolve(json);
        });
      }, (error) => {
        reject({code: null, error: error.message})
      });
    });
  },

  me() {
    let ME_URL = `${BASE_URL}/me`;

    return new Promise((resolve, reject) => {
      const request = requestMethod(ME_URL);

      request.then((response) => {
        if (!response.ok) {
          reject({
            code: response.status,
            error: response.statusText
          });
        }

        response.json().then((json) => {
          resolve(json);
        });
      }, (error) => {
        reject({code: null, error: error.message})
      });
    });
  }
};

export default Spotify;