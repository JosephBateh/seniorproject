import React, {Component} from 'react';
import {ListItem as Item} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import MoreIcon from 'material-ui/svg-icons/navigation/more-horiz';

class SearchItem extends Component {
    moreButtonClicked = (e) => {
        console.log(this.props.id);
    }

    render() {
        return (
            <Item 
                className="playlist-item" 
                primaryText={<p className="playlist-item-title">{this.props.title}</p>}
                secondaryText={<p className="playlist-item-info">{this.props.artist} - {this.props.album}</p>}
                rightIcon={
                    <FlatButton onClick={this.moreButtonClicked}>
                        <MoreIcon />
                    </FlatButton>
                }
            >
            </Item>
        );
    }
}

export default SearchItem;