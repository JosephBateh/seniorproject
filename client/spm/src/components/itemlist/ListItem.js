import React, {Component} from 'react';
import {ListItem as Item} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.id);
    }
    
    render() {
        return (
            <Item 
                className="playlist-item" 
                primaryText={<p className="playlist-item-title">{this.props.title}</p>}
                secondaryText={<p className="playlist-item-info">{this.props.artist} - {this.props.album}</p>}
                rightIcon={<FlatButton label="Delete" onClick={this.onClick} />}>
            </Item>
        );
    }
}

export default ListItem;