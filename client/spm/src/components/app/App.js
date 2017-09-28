import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import List from '../playlist/Playlist';
import Sidebar from '../sidebar/Sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlaylist: '0YOscBKxkkbv8b3VZNcQ1x',
            currentPlaylistSongs: null,
            userID: '1268025728',
            userToken: 'USER_TOKEN',
            spotifyPlaylists: null,
            spotifyCurrentPlaylist: null,
            spotifyPlaylistSongs: null
        };
        
        this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.getUserPlaylists = this.getUserPlaylists.bind(this);
        this.getPlaylistSongs = this.getPlaylistSongs.bind(this);
        this.login = this.login.bind(this);
        this.getSpotifyPlaylists = this.getSpotifyPlaylists.bind(this);
        this.getSpotifyPlaylistSongs = this.getSpotifyPlaylistSongs.bind(this);
    }

    // domain: 'http://example.com'
    // url: '/playlists/guid'
    // method: 'GET'
    getRequest(domain, url, method, stateVar) {
        var baseURL = 'http://localhost:4000/';
        if (process.env.REACT_APP_ENV === 'production') {
            baseURL = domain;
        }

        axios({
            method: method,
            baseURL: baseURL,
            url: url
          })
          .then((response) => {
            var responseString = JSON.stringify(response.data);
            this.setState({[stateVar]: JSON.parse(responseString)});
          })
          .catch(function(err) {
              console.log(err);
          });
    }

    getSpotifyPlaylists() {
        axios({
            method: "GET",
            baseURL: "https://api.spotify.com",
            url: "/v1/users/" + this.state.userID + "/playlists",
            headers: {'Authorization': 'Bearer ' + this.state.userToken},
          })
          .then((response) => {
            var responseString = JSON.stringify(response.data);
            var playlists = JSON.parse(responseString).items;
            var objects = [];
            
            for (var key in playlists) {
                objects.push({
                    Creator: "Joseph Bateh",
                    Title: playlists[key].name,
                    UUID: playlists[key].id
                });
            }

            this.setState({spotifyPlaylists: objects});
          })
          .catch(function(err) {
              console.log(err);
          });
    }

    getSpotifyPlaylistSongs() {
        axios({
            method: "GET",
            baseURL: "https://api.spotify.com",
            url: "/v1/users/" + this.state.userID + "/playlists/" + this.state.currentPlaylist + "/tracks",
            headers: {'Authorization': 'Bearer ' + this.state.userToken},
          })
          .then((response) => {
            var responseString = JSON.stringify(response.data);

            var songs = JSON.parse(responseString).items;
            var objects = [];
            
            for (var key in songs) {
                objects.push({
                    Title: songs[key].track.name,
                    Artist: songs[key].track.artists.name,
                    Album: songs[key].track.album.name
                });
            }

            this.setState({spotifyPlaylistSongs: objects});
          })
          .catch(function(err) {
              console.log(err);
          });
    }

    getUserPlaylists() {
        var domain = 'http://dev.josephbateh.com:4000';
        var url = '/playlists';
        var method = 'GET';
        this.getRequest(domain, url, method, 'userPlaylists');
    }

    getPlaylistSongs(playlist) {
        var domain = 'http://dev.josephbateh.com:4000';
        var url = '/playlists/' + playlist;
        var method = 'GET';
        this.getRequest(domain, url, method, 'currentPlaylistSongs');
    }
    
    handlePlaylistChange(value) {
        this.setState({currentPlaylist: value});
    }

    componentDidMount() {
        //this.getUserPlaylists();
        this.getSpotifyPlaylists();
        //this.getPlaylistSongs(this.state.currentPlaylist);
        this.getSpotifyPlaylistSongs();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        return false;
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.currentPlaylist !== this.state.currentPlaylist) {
            //this.getUserPlaylists();
            //this.getPlaylistSongs(this.state.currentPlaylist);
            this.getSpotifyPlaylistSongs();
        }
    }

    login() {
        console.log("Logging in to Spotify.");
        var domain = 'https://accounts.spotify.com';
        var url = '/authorize';
        var method = 'GET';

        axios({
            method: method,
            baseURL: domain,
            url: url,
            params: {
                client_id: "d34404005f6c45359f360c9e1dd4bac6",
                responseType: "code"
            }
          })
          .then((response) => {
            var responseString = JSON.stringify(response.data);
            this.setState({auth: JSON.parse(responseString)});
          })
          .catch(function(err) {
              console.log(err);
          });
    }

    render() {
        const userPlaylists = this.state.spotifyPlaylists;
        const currentPlaylist = this.state.spotifyCurrentPlaylist;
        const currentPlaylistSongs = this.state.spotifyPlaylistSongs;
        
        return ( 
            <MuiThemeProvider>
                <div className="App">
                    <Sidebar
                        currentPlaylist={currentPlaylist}
                        userPlaylists={userPlaylists}
                        onCurrentPlaylistChange={this.handlePlaylistChange}/>
                    <List
                        currentPlaylist={currentPlaylist}
                        currentPlaylistSongs={currentPlaylistSongs}
                        onCurrentPlaylistChange={this.handlePlaylistChange}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;