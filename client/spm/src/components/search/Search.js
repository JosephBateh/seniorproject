import React, {Component} from 'react';
import {List} from 'material-ui/List';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ListItem from '../itemlist/ListItem';

class Search extends Component {
    render() {
        const songs = JSON.parse(sessionStorage.getItem('CurrentListItems'));
        const searchBarText = sessionStorage.getItem('CurrentSearch');
        
        return(
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <TextField hintText="Search Spotify..." defaultValue={searchBarText || null}/>
                        <FlatButton label="Go"/>
                    </ToolbarGroup>
                </Toolbar>
                <List>
                    {songs ? songs.map((song, index) => <ListItem key={index} title={song.Title} artist={song.Artist} album={song.Album} id={song.ID} onClick={this.onClick}></ListItem>) : <ListItem>Loading...</ListItem>}
                </List>
            </div>
        );
    }
}

export default Search;