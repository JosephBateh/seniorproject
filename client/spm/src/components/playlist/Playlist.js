import React, {Component} from 'react';
import './Playlist.css';
import PlaylistItem from './PlaylistItem';
import {List, ListItem} from 'material-ui/List';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(value) {
        console.log("Playlist clicked: " + value);
        this.props.onClick(value);
    }
    
    render() {
        const songs = this.props.currentPlaylistSongs;
        return (
            <div className="main-content">
                <Toolbar>
                    <ToolbarGroup>
                        <TextField hintText="Search Spotify..."></TextField>
                        <FlatButton label="Go"></FlatButton>
                    </ToolbarGroup>
                </Toolbar>
                <List>
                    {songs ? songs.map((song, index) => <PlaylistItem key={index} title={song.Title} artist={song.Artist} album={song.Album} id={song.ID} onClick={this.onClick}></PlaylistItem>) : <ListItem>Loading...</ListItem>}
                </List>
            </div>
        );
    }
}

export default Playlist;