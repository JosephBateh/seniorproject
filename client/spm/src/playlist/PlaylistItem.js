import React, {Component} from 'react';
import './PlaylistItem.css';
import {ListItem} from 'material-ui/List';

class PlaylistItem extends Component {
    render() {
        return (
            <ListItem className="playlist-item" 
                primaryText={<p className="playlist-item-title">{this.props.title}</p>}
                secondaryText={<p className="playlist-item-info">{this.props.artist} - {this.props.album}</p>}>                
            </ListItem>
        );
    }
}

export default PlaylistItem;