import React, {Component} from 'react';
import {List} from 'material-ui/List';
import SearchItem from '../search/SearchItem';
import Searchbar from '../searchbar/Searchbar';

class Search extends Component {
    render() {
        const songs = JSON.parse(sessionStorage.getItem('CurrentListItems'));
        
        return(
            <div>
                <Searchbar/>
                <List>
                    {songs ? songs.map((song, index) => <SearchItem key={index} title={song.Title} artist={song.Artist} album={song.Album} id={song.ID}></SearchItem>) : <SearchItem>Loading...</SearchItem>}
                </List>
            </div>
        );
    }
}

export default Search;