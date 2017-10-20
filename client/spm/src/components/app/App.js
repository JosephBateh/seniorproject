import React, {Component} from 'react';
import {withRouter, Route} from 'react-router-dom';
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

    componentDidUpdate(nextProps, nextState) {
        if (nextState.playlist !== this.state.playlist) {
            this.getPlaylistItems();
        }
    }
    
    // How I would do simple things like this method:
    changeSearchText = search => this.setState({ search });

    search = () => {
        // API call fails if currentSearch is null or empty
        if (this.state.search) {

            // THIS IS WHAT CHANGES THE URL
            this.props.history.push('/search');

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
                    <Route path="/" render={() =>(
                        <Playlist
                            items={this.state.playlistItems}
                            deleteItems={this.deleteItems}
                        />)} 
                    />
                    <Route path="/search" render={() =>(
                        <Search items={this.state.searchList}/>} 
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(App);
