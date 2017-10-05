import React, {Component} from 'react';
import SidebarItem from './SidebarItem'
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';

class Sidebar extends Component {    
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(value) {
        this.props.onClick(value);
    }
    
    render() {
        const playlists = this.props.userPlaylists;
        return (
            <Drawer className="sidebar" open={true}>
                <List className="sidebar-flexlist">
                    {playlists ? playlists.map((result, index) => <SidebarItem id={result.UUID} onClick={this.onClick} key={index} title={result.Title} creator={result.Creator} ></SidebarItem>) : <ListItem>loading...</ListItem>}
                </List>
            </Drawer>
        );
    }
}

export default Sidebar;