import React, {Component} from 'react';
import {List} from 'material-ui/List';
import ListItem from '../itemlist/ListItem';
import Searchbar from '../searchbar/Searchbar';
import * as API from '../../helpers/API.js';

class Search extends Component {

    searchButtonClicked = (text) => {
        var items = this.props.currentListItems;
        sessionStorage.setItem('CurrentListItems', JSON.stringify(items));

        // API call fails if text is null or empty
        if (text) {
            API.searchSpotify(text).then((data) => {
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
                sessionStorage.setItem('CurrentListItems', JSON.stringify(x));
                window.location = 'http://localhost:3000/search/';
            });
        }
    }

    onChange = (value) => {
        sessionStorage.setItem('CurrentSearch', value);
    }

    render() {
        const songs = JSON.parse(sessionStorage.getItem('CurrentListItems'));
        const searchBarText = sessionStorage.getItem('CurrentSearch');
        
        return(
            <div>
                <Searchbar
                    searchButtonClicked={this.searchButtonClicked}
                    onTextChange={this.onChange}
                    text={searchBarText}
                />
                <List>
                    {songs ? songs.map((song, index) => <ListItem key={index} title={song.Title} artist={song.Artist} album={song.Album} id={song.ID} onClick={this.onClick}></ListItem>) : <ListItem>Loading...</ListItem>}
                </List>
            </div>
        );
    }
}

export default Search;