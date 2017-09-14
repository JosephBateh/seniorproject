import React, {Component} from 'react';
import './PlaylistItem.css';
import Divider from 'material-ui/Divider';

class PlaylistItem extends Component {
    render() {
        return (
            <li className="playlist-item">
                <span className="playlist-item-title">{this.props.title}</span>
                <span className="playlist-item-info">{this.props.artist} - {this.props.album}</span>
                <Divider></Divider>
            </li>
        );
    }
}

export default PlaylistItem;