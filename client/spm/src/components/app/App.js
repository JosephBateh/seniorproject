import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Playlist from '../playlist/Playlist';
import Sidebar from '../sidebar/Sidebar';
import * as API from '../../helpers/API.js';

class App extends Component {
    state = {
        currentPlaylist: null,
        currentPlaylistSongs: null,
        spotifyPlaylists: null
    }

    getUser = () => {
        API.getUser(API.getToken())
        .then((ID) => {
            API.setUserID(ID);
        });
    }

    getSpotifyPlaylists = () => {
        API.getPlaylists(API.getToken(), API.getUserID()).then((playlists) => {
            this.setState({
                spotifyPlaylists: playlists,
                currentPlaylist: playlists[0].UUID
            })
        });
    }

    getSpotifyPlaylistSongs = () => {
        axios({
            method: "GET",
            baseURL: "https://api.spotify.com",
            url: "/v1/users/" + API.getUserID() + "/playlists/" + this.state.currentPlaylist + "/tracks",
            headers: {'Authorization': 'Bearer ' + API.getToken()},
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

    deleteSongsFromPlaylist = (toBeDeleted) => {
        const tracks = {
            "tracks": [
                { "uri": "spotify:track:" + toBeDeleted }
            ]
        }

        axios({
            method: "DELETE",
            baseURL: "https://api.spotify.com",
            url: "/v1/users/" + API.getUserID() + "/playlists/" + this.state.currentPlaylist + "/tracks",
            headers: {'Authorization': 'Bearer ' + API.getToken()},
            data: tracks
          })
          .then((response) => {
            console.log(response);
          })
          .catch(function(err) {
              console.log(err);
          });

        // TODO: Delete from view
    }
    
    handlePlaylistChange = (value) => {
        this.setState({currentPlaylist: value});
    }

    playlistItemClicked = (value) => {
        this.deleteSongsFromPlaylist(value);
    }

    componentDidMount() {
        
    }

    componentWillMount() {
        this.getUser();
        this.getSpotifyPlaylists();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        if (nextProps !== this.props) {
            return true;
        }
        return false;
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.currentPlaylist !== this.state.currentPlaylist) {
            this.getSpotifyPlaylistSongs();
        }
    }

    render() {
        const userPlaylists = this.state.spotifyPlaylists;
        const currentPlaylist = this.state.currentPlaylist;
        const currentListItems = this.state.currentPlaylistSongs;
        
        return ( 
            <div className="App">
                <Sidebar
                    currentPlaylist={currentPlaylist}
                    playlists={userPlaylists}
                    onClick={this.handlePlaylistChange}
                />
                <Playlist
                    currentPlaylist={currentPlaylist}
                    currentListItems={currentListItems}
                    onClick={this.playlistItemClicked}
                />
            </div>
        );
    }
}

export default App;