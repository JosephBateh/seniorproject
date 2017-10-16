import React, {Component} from 'react';
import './Playlist.css';
import Searchbar from '../searchbar/Searchbar';
import * as API from '../../helpers/API.js';
import {List, ListItem as Item} from 'material-ui/List';
import PlaylistItem from './PlaylistItem';

class Playlist extends Component {
    onClick = (value) => {
        this.props.onClick(value);
    }

    onChange = (value) => {
        sessionStorage.setItem('CurrentSearch', value);
    }

    deleteItems = (items) => {
        this.props.deleteItems(items);
    }

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
    
    render() {
        const items = this.props.currentListItems;
        const searchBarText = sessionStorage.getItem('CurrentSearch');

        return (
            <div className="main-content">
                <Searchbar
                    searchButtonClicked={this.searchButtonClicked}
                    onTextChange={this.onChange}
                    text={searchBarText}
                />
                <List>
                    {items ? items.map((item, index) => <PlaylistItem key={index} title={item.Title} artist={item.Artist} album={item.Album} id={item.ID} delete={this.deleteItems}></PlaylistItem>) : <Item>Loading...</Item>}
                </List>
            </div>
        );
    }
}

export default Playlist;