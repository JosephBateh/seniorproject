import React, {Component} from 'react';
import './PlaylistItem.css';

class PlaylistItem extends Component {
    render() {
        return (
            <li className="playlist-item">
                <span className="playlist-item-title">{this.props.title}</span>
                <span className="playlist-item-info">{this.props.artist} - {this.props.album}</span>
            </li>
        );
    }
}

export default PlaylistItem;