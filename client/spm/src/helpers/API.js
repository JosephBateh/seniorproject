import axios from 'axios';

var REDIRECT_URI = 'http://localhost:3000/callback/';
var TOKEN = getToken();
var USER_ID = getUserID();

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

export function setUserID(id) {
    sessionStorage.setItem('userID', id);
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

export function getPlaylists(USER_ID) {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com",
        url: "/v1/users/" + getUserID() + "/playlists",
        headers: {'Authorization': 'Bearer ' + TOKEN},
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

export function searchSpotify(query) {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com/v1/",
        url: "search/",
        headers: {'Authorization': 'Bearer ' + TOKEN},
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

export function getPlaylistItems(playlist) {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com",
        url: "/v1/users/" + USER_ID + "/playlists/" + playlist + "/tracks",
        headers: {'Authorization': 'Bearer ' + TOKEN},
      })
      .then((response) => {
        return response.data.items.map( Item => {
            return {
                ID: Item.track.id,
                Title: Item.track.name,
                Artist: Item.track.artists[0].name,
                Album: Item.track.album.name
            };
        });
      })
      .catch(function(err) {
          console.log(err);
      });
}

// Takes an array with the ids to be deleted
export function deleteItems(items, playlist) {
    var itemsArray = items.map( item => {
        return {
            "uri": "spotify:track:" + item
        }
    });

    const tracks = {
        tracks: itemsArray
    }

    return axios({
        method: "DELETE",
        baseURL: "https://api.spotify.com",
        url: "/v1/users/" + USER_ID + "/playlists/" + playlist + "/tracks",
        headers: {'Authorization': 'Bearer ' + TOKEN},
        data: tracks
      })
      .catch(function(err) {
          console.log(err);
      });
}