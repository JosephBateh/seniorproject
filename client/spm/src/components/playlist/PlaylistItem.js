import React, {Component} from 'react';
import {ListItem as Item} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class ListItem extends Component {
    deleteItem = () => {
        this.props.delete(this.props.id);
    }
    
    render() {
        return (
            <Item 
                className="playlist-item" 
                primaryText={<p className="playlist-item-title">{this.props.title}</p>}
                secondaryText={<p className="playlist-item-info">{this.props.artist} - {this.props.album}</p>}
                rightIcon={
                    <FlatButton onClick={this.deleteItem}>
                        <DeleteIcon/>
                    </FlatButton>
                }>
            </Item>
        );
    }
}

export default ListItem;