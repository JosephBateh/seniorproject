import React, {Component} from 'react';
import './Playlist.css';
import Searchbar from '../searchbar/Searchbar';
import ItemList from '../itemlist/ItemList';
import * as API from '../../helpers/API.js';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
    }

    onClick(value) {
        this.props.onClick(value);
    }

    onChange(value) {
        sessionStorage.setItem('CurrentSearch', value);
    }

    searchButtonClicked(text) {
        var items = this.props.currentPlaylistItems;
        sessionStorage.setItem('CurrentPlaylistItems', JSON.stringify(items));

        // TODO: Make sure text isn't null or empty

        API.searchSpotify(text).then((data) => {console.log(data)});
        window.location = 'http://localhost:3000/search/';
    }
    
    render() {
        const items = this.props.currentPlaylistItems;
        const searchBarText = sessionStorage.getItem('CurrentSearch');

        return (
            <div className="main-content">
                <Searchbar
                    searchButtonClicked={this.searchButtonClicked}
                    onTextChange={this.onChange}
                    text={searchBarText}
                />
                <ItemList
                    items={items}
                    onClick={this.onClick}
                />
            </div>
        );
    }
}

export default Playlist;