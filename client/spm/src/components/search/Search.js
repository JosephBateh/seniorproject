import React, {Component} from 'react';
import {List} from 'material-ui/List';
import SearchItem from '../search/SearchItem';
import Searchbar from '../searchbar/Searchbar';
import Loading from '../loading/Loading'
import * as API from '../../helpers/API';

class Search extends Component {
    state = {
        playlists: null
    }

    addToPlaylist = (item, playlist) => {
        API.addItemsToPlaylist([item], playlist);
    }

    deleteItems = (value) => {
        var newItems = this.state.currentPlaylistItems.filter( (item) =>
            item.ID !== value
        );
        
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
        API.getPlaylists().then( (playlists) => {
            this.setState({
                playlists: playlists
            })
        });
    }

    render() {
        const songs = JSON.parse(sessionStorage.getItem('CurrentListItems'));
        
        return this.state.playlists ? (
            <div>
                <Searchbar/>
                <List>
                    {songs ? songs.map((song, index) => <SearchItem key={index} title={song.Title} artist={song.Artist} album={song.Album} id={song.ID} playlists={this.state.playlists} addToPlaylist={this.addToPlaylist}></SearchItem>) : <SearchItem>Loading...</SearchItem>}
                </List>
            </div>
        ) : (
            <Loading></Loading>
        );
    }
}

export default Search;