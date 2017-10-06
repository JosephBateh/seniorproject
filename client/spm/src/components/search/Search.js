import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import PlaylistItem from '../playlist/PlaylistItem';
import Sidebar from '../sidebar/Sidebar';

class Search extends Component {
    render() {
        const songs = JSON.parse(sessionStorage.getItem('CurrentPlaylistItems'));
        const searchBarText = JSON.parse(sessionStorage.getItem('CurrentSearch'));
        
        return(
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <TextField hintText="Search Spotify..." defaultValue={searchBarText || null}/>
                        <FlatButton label="Go"/>
                    </ToolbarGroup>
                </Toolbar>
                <List>
                    {songs ? songs.map((song, index) => <PlaylistItem key={index} title={song.Title} artist={song.Artist} album={song.Album} id={song.ID} onClick={this.onClick}></PlaylistItem>) : <ListItem>Loading...</ListItem>}
                </List>
            </div>
        );
    }
}

export default Search;