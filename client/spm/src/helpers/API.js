import axios from 'axios';

var REDIRECT_URI = 'http://localhost:3000/callback/';

if (process.env.NODE_ENV === 'production') {
    REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
}

export function getToken() {
    return sessionStorage.getItem('userToken');
}

export function setToken(token) {
    sessionStorage.setItem('userToken', token);
}

export function getUserID() {
    return sessionStorage.getItem('userID');
}

export function setUserID(userID) {
    sessionStorage.setItem('userID', userID);
}

export function getUser(token) {
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

export function getPlaylists(token, id) {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com",
        url: "/v1/users/" + id + "/playlists",
        headers: {'Authorization': 'Bearer ' + token},
      })
      .then((response) => {
        var playlists = response.data.items;
        var objects = [];
        
        for (var key in playlists) {
            objects.push({
                Creator: "Joseph Bateh",
                Title: playlists[key].name,
                UUID: playlists[key].id
            });
        }

        return objects;
      })
      .catch(function(err) {
          console.log(err);
      });
}

export function searchSpotify(token, query) {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com/v1/",
        url: "search/",
        headers: {'Authorization': 'Bearer ' + token},
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