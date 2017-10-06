import React, {Component} from 'react';
import './Playlist.css';
import PlaylistItem from './PlaylistItem';
import {List, ListItem} from 'material-ui/List';
import Searchbar from '../searchbar/Searchbar';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
    }

    onClick(value) {
        this.props.onClick(value);
    }

    onChange(value) {
        sessionStorage.setItem('CurrentSearch', value);
    }

    searchButtonClicked(text) {
        var items = this.props.currentPlaylistItems;
        sessionStorage.setItem('CurrentPlaylistItems', JSON.stringify(items));
        window.location = 'http://localhost:3000/search/';
    }
    
    render() {
        const songs = this.props.currentPlaylistItems;
        const searchBarText = sessionStorage.getItem('CurrentSearch');

        return (
            <div className="main-content">
                <Searchbar
                    searchButtonClicked={this.searchButtonClicked}
                    onTextChange={this.onChange}
                    text={searchBarText}
                />
                <List>
                    {songs ? songs.map((song, index) => <PlaylistItem key={index} title={song.Title} artist={song.Artist} album={song.Album} id={song.ID} onClick={this.onClick}></PlaylistItem>) : <ListItem>Loading...</ListItem>}
                </List>
            </div>
        );
    }
}

export default Playlist;