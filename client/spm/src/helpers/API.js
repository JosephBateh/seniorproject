import axios from 'axios';

var REDIRECT_URI = 'http://localhost:3000/callback/';

if (process.env.NODE_ENV === 'production') {
    REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
}

export function getSpotifyUser(token) {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com",
        url: "/v1/me",
        headers: {'Authorization': 'Bearer ' + token},
      })
      .then((response) => {
        return response.data.id;
      })
      .catch((err) => {
          console.log(err);
      });
}

export function searchSpotify(query) {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com/v1/",
        url: "search/",
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('UserToken')},
        params: {
            q: query,
            type: "track,artist,album"
        }
      })
      .catch(function(err) {
          console.log(err);
      });
}

export function authorize() {
    var apiScope = 'playlist-read-private';
    apiScope += ' playlist-modify-public';
    apiScope += ' playlist-modify-private';
    apiScope += ' user-library-read';
    apiScope += ' user-library-modify';
    apiScope += ' user-read-currently-playing';
    apiScope += ' user-read-recently-played';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(process.env.REACT_APP_CLIENT_ID);
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
    url += '&scope=' + apiScope;
    
    fetch('/authorize', {
        method: 'GET',
    })
    .then( () => {
        window.location = url;
    })
    .catch(e => {
        console.log(e);
    });
}