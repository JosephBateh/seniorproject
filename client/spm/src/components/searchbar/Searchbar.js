import React, {Component} from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as API from '../../helpers/API.js';

class Searchbar extends Component {
    onChange = (e, value) => {
        sessionStorage.setItem('CurrentSearch', value);
    }

    searchButtonClicked = () => {
        var currentSearch = sessionStorage.getItem('CurrentSearch');

        // API call fails if currentSearch is null or empty
        if (currentSearch) {
            API.searchSpotify(currentSearch).then((data) => {
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
                if (window.location !== 'http://localhost:3000/search/') {
                    window.location = 'http://localhost:3000/search/';
                }
            });
        }
    }
    
    render() {
        const searchBarText = sessionStorage.getItem('CurrentSearch');

        return (
            <div className="searchbar">
                <Toolbar>
                    <ToolbarGroup>
                        <TextField hintText="Search..." onChange={this.onChange} defaultValue={searchBarText}></TextField>
                        <FlatButton label="Search" onClick={this.searchButtonClicked}></FlatButton>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

export default Searchbar;