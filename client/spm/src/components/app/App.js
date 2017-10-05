import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import List from '../playlist/Playlist';
import Sidebar from '../sidebar/Sidebar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlaylist: null,
            currentPlaylistSongs: null,
            userID: null,
            userToken: null,
            spotifyPlaylists: null
        };
        
        this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
        this.playlistItemClicked = this.playlistItemClicked.bind(this);
        this.getSpotifyUser = this.getSpotifyUser.bind(this);
        this.getSpotifyPlaylists = this.getSpotifyPlaylists.bind(this);
        this.getSpotifyPlaylistSongs = this.getSpotifyPlaylistSongs.bind(this);
        this.deleteSongsFromPlaylist = this.deleteSongsFromPlaylist.bind(this);
    }

    getSpotifyUser() {
        axios({
            method: "GET",
            baseURL: "https://api.spotify.com",
            url: "/v1/me",
            headers: {'Authorization': 'Bearer ' + this.state.userToken},
          })
          .then((response) => {
            this.setState({
                userID: response.data.id
            });
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
            var playlists = response.data.items;
            var objects = [];
            
            for (var key in playlists) {
                objects.push({
                    Creator: "Joseph Bateh",
                    Title: playlists[key].name,
                    UUID: playlists[key].id
                });
            }

            this.setState({
                spotifyPlaylists: objects,
                currentPlaylist: objects[0].UUID
            });
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
            const currentPlaylistSongs = response.data.items.map( song => {
                return {
                    ID: song.track.id,
                    Title: song.track.name,
                    Artist: song.track.artists[0].name,
                    Album: song.track.album.name
                };
            });

            this.setState({
                currentPlaylistSongs
            });
          })
          .catch(function(err) {
              console.log(err);
          });
    }

    deleteSongsFromPlaylist(toBeDeleted) {
        // const tracksList = toBeDeleted.map( track => {
        //     return {
        //         "uri": "spotify:track:" + track.id
        //     };
        // });

        const tracks = {
            // "tracks": [
            //     tracksList
            // ]
            "tracks": [
                { "uri": "spotify:track:" + toBeDeleted }
            ]
        }

        axios({
            method: "DELETE",
            baseURL: "https://api.spotify.com",
            url: "/v1/users/" + this.state.userID + "/playlists/" + this.state.currentPlaylist + "/tracks",
            headers: {'Authorization': 'Bearer ' + this.state.userToken},
            data: tracks
          })
          .then((response) => {
            console.log(response);
          })
          .catch(function(err) {
              console.log(err);
          });

        //var currentState = this.state.currentPlaylistSongs;
        // Delete from view
    }
    
    handlePlaylistChange(value) {
        this.setState({currentPlaylist: value});
    }

    playlistItemClicked(value) {
        console.log("PlaylistItemClicked: " + value);
        this.deleteSongsFromPlaylist(value);
    }

    componentDidMount() {
        this.getSpotifyUser();
    }

    componentWillMount() {
        // This is dirty, I know
        var token = this.props.location.hash.split('=')[1].split('&')[0];
        this.setState({
            userToken: token
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        return false;
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.userID !== this.state.userID) {
            this.getSpotifyPlaylists();
        } else if (nextState.currentPlaylist !== this.state.currentPlaylist) {
            this.getSpotifyPlaylistSongs();
        }
    }

    render() {
        const userPlaylists = this.state.spotifyPlaylists;
        const currentPlaylist = this.state.currentPlaylist;
        const currentPlaylistSongs = this.state.currentPlaylistSongs;
        
        return ( 
            <div className="App">
                <Sidebar
                    currentPlaylist={currentPlaylist}
                    userPlaylists={userPlaylists}
                    onClick={this.handlePlaylistChange}/>
                <List
                    currentPlaylist={currentPlaylist}
                    currentPlaylistSongs={currentPlaylistSongs}
                    onClick={this.playlistItemClicked}/>
            </div>
        );
    }
}

export default App;