import Auth from './Auth';

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
    let SEARCH_URL = 'https://api.spotify.com/v1/search?type=track';

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
  }
};

export default Spotify;