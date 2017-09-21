import React, {Component} from 'react';
import './PlaylistItem.css';
import {ListItem} from 'material-ui/List';

class PlaylistItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        //console.log("something");
    }
    
    render() {
        return (
            <ListItem 
                className="playlist-item" 
                primaryText={<p className="playlist-item-title">{this.props.title}</p>}
                secondaryText={<p className="playlist-item-info">{this.props.artist} - {this.props.album}</p>}
                onClick={this.onClick}>           
            </ListItem>
        );
    }
}

export default PlaylistItem;