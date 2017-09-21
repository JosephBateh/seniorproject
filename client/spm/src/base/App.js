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
            currentPlaylist: '0000',
            currentPlaylistSongs: null
        };
        
        this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.getUserPlaylists = this.getUserPlaylists.bind(this);
        this.getPlaylistSongs = this.getPlaylistSongs.bind(this);
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
        this.getUserPlaylists();
        this.getPlaylistSongs(this.state.currentPlaylist);
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
            this.getPlaylistSongs(this.state.currentPlaylist);
        }
    }

    render() {
        const userPlaylists = this.state.userPlaylists;
        const currentPlaylist = this.state.currentPlaylist;
        const currentPlaylistSongs = this.state.currentPlaylistSongs;
        
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