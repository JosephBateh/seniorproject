import React, {Component} from 'react';
import SidebarItem from './SidebarItem'
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';

class Sidebar extends Component {    
    onClick = (value) => {
        this.props.onClick(value);
    }
    
    render() {
        const playlists = this.props.playlists;
        return (
            <Drawer className="sidebar" open={true}>
                <List className="sidebar-flexlist">
                    {playlists ? playlists.map((playlist, index) => <SidebarItem id={playlist.UUID} onClick={this.onClick} key={index} title={playlist.Title} creator={playlist.Creator} ></SidebarItem>) : <ListItem>loading...</ListItem>}
                </List>
            </Drawer>
        );
    }
}

export default Sidebar;