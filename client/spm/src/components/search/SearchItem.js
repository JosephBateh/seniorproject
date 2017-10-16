import React, {Component} from 'react';
import {ListItem as Item} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreIcon from 'material-ui/svg-icons/navigation/more-horiz';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreMenu from './MoreMenu';

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
                rightIconButton={
                    <IconMenu
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        iconButtonElement={
                            <IconButton tooltip="more">
                                <MoreIcon></MoreIcon>
                            </IconButton>
                        }
                    >
                        <MenuItem
                            primaryText="Add to playlist"
                            menuItems={[
                                <MenuItem primaryText="UPPERCASE" />,
                                <MenuItem primaryText="lowercase" />,
                                <MenuItem primaryText="CamelCase" />,
                                <MenuItem primaryText="Propercase" />,
                            ]}
                        />
                    </IconMenu>
                    
                }
            >
            </Item>
        );
    }
}

export default SearchItem;