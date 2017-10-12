import React, {Component} from 'react';
import axios from 'axios';
import Playlist from '../playlist/Playlist';
import Sidebar from '../sidebar/Sidebar';
import * as API from '../../helpers/API.js';

class App extends Component {
    state = {
        currentPlaylist: null,
        currentPlaylistItems: null,
        userPlaylists: null
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
                userPlaylists: playlists,
                currentPlaylist: playlists[0].UUID
            })
        });
    }

    getSpotifyPlaylistItems = () => {
        axios({
            method: "GET",
            baseURL: "https://api.spotify.com",
            url: "/v1/users/" + API.getUserID() + "/playlists/" + this.state.currentPlaylist + "/tracks",
            headers: {'Authorization': 'Bearer ' + API.getToken()},
          })
          .then((response) => {
            const currentPlaylistItems = response.data.items.map( Item => {
                return {
                    ID: Item.track.id,
                    Title: Item.track.name,
                    Artist: Item.track.artists[0].name,
                    Album: Item.track.album.name
                };
            });

            this.setState({
                currentPlaylistItems
            });
          })
          .catch(function(err) {
              console.log(err);
          });
    }

    deleteItemsFromPlaylist = (toBeDeleted) => {
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
        this.deleteItemsFromPlaylist(value);
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
            this.getSpotifyPlaylistItems();
        }
    }

    render() {
        return ( 
            <div className="App">
                <Sidebar
                    currentPlaylist={this.state.currentPlaylist}
                    playlists={this.state.userPlaylists}
                    onClick={this.handlePlaylistChange}
                />
                <Playlist
                    currentPlaylist={this.state.currentPlaylist}
                    currentListItems={this.state.currentPlaylistItems}
                    onClick={this.playlistItemClicked}
                />
            </div>
        );
    }
}

export default App;