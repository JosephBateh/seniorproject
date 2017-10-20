import React, {Component} from 'react';
import Playlist from '../playlist/Playlist';
import Sidebar from '../sidebar/Sidebar';
import Search from '../search/Search';
import Searchbar from '../searchbar/Searchbar';
import * as API from '../../helpers/API.js';

class App extends Component {
    state = {
        playlist: null,
        listPlaylists: null,
        search: null,
        searchList: null,
        view: "PLAYLIST"
    }

    getPlaylists = () => {
        API.getPlaylists().then((playlists) => {
            this.setState({
                listPlaylists: playlists,
                playlist: playlists[0].UUID
            })
        });
    }

    getPlaylistItems = () => {
        API.getPlaylistItems(this.state.playlist).then((items) => {        
            this.setState({
                playlistItems: items
            });
        });
    }
    
    handlePlaylistChange = (value) => {
        this.setState({
            playlist: value,
            view: "PLAYLIST"
        });
    }

    deleteItems = (value) => {
        var newItems = this.state.playlistItems.filter( (item) =>
            item.ID !== value
        );
        
        API.deleteItems([value], this.state.playlist)
        .then((retVal) => {
            if (retVal.status === 200) {
                this.setState({
                    playlistItems: newItems
                })
            }
        });
    }

    componentWillMount() {
        this.getPlaylists();
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
        if (nextState.playlist !== this.state.playlist) {
            this.getPlaylistItems();
        }
    }

    changeSearchText = (text) => {
        this.setState({
            search: text
        });
    }

    search = () => {
        // API call fails if currentSearch is null or empty
        if (this.state.search) {

            // Change view to search view
            this.setState({
                view: "SEARCH"
            });

            // Populate search view components
            API.searchSpotify(this.state.search).then((data) => {
                // Parse JSON into my model
                var x = data.data.tracks.items.map( item => {
                    x = {
                        ID: item.id,
                        Title: item.name,
                        Artist: item.artists[0].name,
                        Album: item.album.name
                    }
                    return x;
                });
                return x;
            })
            .then(x => {
                this.setState({
                    searchList: x
                });
            });
        }
    }

    render() {
        var view = (
            <Playlist
                items={this.state.playlistItems}
                deleteItems={this.deleteItems}
            />
        );

        if (this.state.view === "SEARCH") {
            view = (
                <Search
                    items={this.state.searchList}
                />
            );
        }


        return ( 
            <div className="App">
                <Sidebar
                    currentPlaylist={this.state.playlist}
                    playlists={this.state.listPlaylists}
                    onClick={this.handlePlaylistChange}
                />
                <div className="main-content">
                    <Searchbar
                        onTextChange={this.changeSearchText}
                        onSearch={this.search}
                        text={this.state.search}
                    />
                    {view}
                </div>
            </div>
        );
    }
}

export default App;
