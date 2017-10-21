import axios from "axios";

const REDIRECT_URI =
    process.env.NODE_ENV === "production" || process.env.REACT_APP_HEROKU_ENV === "production"
        ? process.env.REACT_APP_REDIRECT_URI
        : "http://localhost:3000/callback/";

const USER_TOKEN = "userToken";
const USER_ID = "userID";

export function getToken() {
    return sessionStorage.getItem(USER_TOKEN);
}

export function setToken(token) {
    sessionStorage.setItem(USER_TOKEN, token);
}

export function getUserID() {
    return sessionStorage.getItem(USER_ID);
}

export function setUserID(id) {
    sessionStorage.setItem(USER_ID, id);
}

export function getUser(token) {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com",
        url: "/v1/me",
        headers: { Authorization: "Bearer " + token }
    })
        .then(response => {
            return response.data.id;
        })
        .catch(err => {
            console.log(err);
        });
}

export function getPlaylists() {
    return axios({
        method: "GET",
        baseURL: "https://api.spotify.com",
        url: "/v1/users/" + getUserID() + "/playlists",
        headers: { Authorization: "Bearer " + getToken() }
    })
        .then(response => {
            var playlists = response.data.items;

            return playlists.map(playlist => {
                return {
                    Creator: "Joseph Bateh",
                    Title: playlist.name,
                    UUID: playlist.id
                };
            });
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
        headers: { Authorization: "Bearer " + getToken() },
        params: {
            q: query,
            type: "track,artist,album"
        }
    }).catch(e => {
        console.log(e);
    });
}

export function authorize() {
    var apiScope = [
        "playlist-read-private",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-library-read",
        "user-library-modify",
        "user-read-currently-playing",
        "user-read-recently-played"
    ].join(" ");

    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(process.env.REACT_APP_CLIENT_ID);
    url += "&redirect_uri=" + encodeURIComponent(REDIRECT_URI);
    url += "&scope=" + apiScope;

    fetch("/authorize", {
        method: "GET"
    })
        .then(() => {
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
        url: "/v1/users/" + getUserID() + "/playlists/" + playlist + "/tracks",
        headers: { Authorization: "Bearer " + getToken() }
    })
        .then(response => {
            return response.data.items.map(Item => {
                return {
                    ID: Item.track.id,
                    Title: Item.track.name,
                    Artist: Item.track.artists[0].name,
                    Album: Item.track.album.name
                };
            });
        })
        .catch(e => {
            console.log(e);
        });
}

// Takes an array with the ids to be deleted
export function deleteItems(items, playlist) {
    const tracks = {
        tracks: items.map(item => {
            return { uri: "spotify:track:" + item };
        })
    };

    return axios({
        method: "DELETE",
        baseURL: "https://api.spotify.com",
        url: "/v1/users/" + getUserID() + "/playlists/" + playlist + "/tracks",
        headers: { Authorization: "Bearer " + getToken() },
        data: tracks
    }).catch(e => {
        console.log(e);
    });
}

export function addItemsToPlaylist(items, playlist) {
    const uris = {
        uris: items.map(item => {
            return "spotify:track:" + item;
        })
    };

    return axios({
        method: "POST",
        baseURL: "https://api.spotify.com",
        url: "/v1/users/" + getUserID() + "/playlists/" + playlist + "/tracks",
        headers: { Authorization: "Bearer " + getToken() },
        data: uris
    }).catch(e => {
        console.log(e);
    });
}
