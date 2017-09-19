import React, {Component} from 'react';
import './Playlist.css';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';
import {List, ListItem} from 'material-ui/List';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var getURL = 'http://localhost:4000/';
        if (process.env.REACT_APP_ENV === 'production') {
            getURL = 'http://dev.josephbateh.com:4000';
        }
        axios({
            method: 'GET',
            baseURL: getURL,
            url: '/playlists/0000'
          })
          .then((response) => {
            var responseString = JSON.stringify(response.data);
            var responseObject = JSON.parse(responseString);
            this.setState({
                results: responseObject
            });            
          })
          .catch(function(err) {
              console.log(err);
          });
    }
    
    render() {
        return (
            <div className="playlist-wrapper">
                <div className="playlist">
                    <List className="flex-list">
                        {this.state.results ? this.state.results.map((result, index) => <PlaylistItem key={index} title={result.Title} artist={result.Artist} album={result.Album}></PlaylistItem>) : <ListItem>Loading...</ListItem>}
                    </List>
                </div>
            </div>
        );
    }
}

export default Playlist;