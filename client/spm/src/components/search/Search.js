import React, {Component} from 'react';
import {List} from 'material-ui/List';
import ListItem from '../search/SearchItem';
import Searchbar from '../searchbar/Searchbar';

class Search extends Component {
    render() {
        const songs = JSON.parse(sessionStorage.getItem('CurrentListItems'));
        
        return(
            <div>
                <Searchbar/>
                <List>
                    {songs ? songs.map((song, index) => <ListItem key={index} title={song.Title} artist={song.Artist} album={song.Album} id={song.ID} onClick={this.onClick}></ListItem>) : <ListItem>Loading...</ListItem>}
                </List>
            </div>
        );
    }
}

export default Search;