import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

class PlaylistItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        console.log("PlaylistItem clicked: " + this.props.id);
        this.props.onClick(this.props.id);
    }
    
    render() {
        return (
            <ListItem 
                className="playlist-item" 
                primaryText={<p className="playlist-item-title">{this.props.title}</p>}
                secondaryText={<p className="playlist-item-info">{this.props.artist} - {this.props.album}</p>}
                rightIcon={<FlatButton label="Delete" onClick={this.onClick} />}>
            </ListItem>
        );
    }
}

export default PlaylistItem;