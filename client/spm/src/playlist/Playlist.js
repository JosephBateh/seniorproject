import React, {Component} from 'react';
import './Playlist.css';
import axios from 'axios';
import PlaylistItem from './PlaylistItem';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios({
            method: 'GET',
            baseURL: 'http://localhost:4000/',
            url: '/dummydata'
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
            <div className="playlist">
                <ul>
                    {this.state.results ? this.state.results.map((result, index) => <PlaylistItem key={index} title={result.Title} artist={result.Artist} album={result.Album}></PlaylistItem>) : <li>Loading...</li>}
                </ul>
            </div>
        );
    }
}

export default Playlist;