import React, {Component} from 'react';
import './Playlist.css';
import PlaylistItem from './PlaylistItem';
import {List, ListItem} from 'material-ui/List';

class Playlist extends Component {
    render() {
        const songs = this.props.currentPlaylistSongs;
        return (
            <div className={"main-content-wrapper"}>
                <List className="main-content">
                    {songs ? songs.map((list, index) => <PlaylistItem key={index} title={list.Title} artist={list.Artist} album=    {list.Album}></PlaylistItem>) : <ListItem>Loading...</ListItem>}
                </List>
            </div>
        );
    }
}

export default Playlist;