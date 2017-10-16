import React, {Component} from 'react';
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

    getUserPlaylists = () => {
        API.getPlaylists(API.getToken(), API.getUserID()).then((playlists) => {
            this.setState({
                userPlaylists: playlists,
                currentPlaylist: playlists[0].UUID
            })
        });
    }

    getPlaylistItems = () => {
        API.getPlaylistItems(this.state.currentPlaylist).then((items) => {        
            this.setState({
                currentPlaylistItems: items
            });
        });
    }
    
    handlePlaylistChange = (value) => {
        this.setState({currentPlaylist: value});
    }

    deleteItems = (value) => {
        var newItems = [];

        this.state.currentPlaylistItems.map( (item) => {
            if (item.ID !== value) {
                newItems.push(item);
            }
            return item;
        });
        
        API.deleteItems([value], this.state.currentPlaylist)
        .then((retVal) => {
            if (retVal.status === 200) {
                this.setState({
                    currentPlaylistItems: newItems
                })
            }
        });
    }

    componentWillMount() {
        this.getUser();
        this.getUserPlaylists();
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
            this.getPlaylistItems();
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
                    deleteItems={this.deleteItems}
                />
            </div>
        );
    }
}

export default App;