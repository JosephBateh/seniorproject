import React, {Component} from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem'
import {List, ListItem} from 'material-ui/List';

class Sidebar extends Component {    
    render() {
        const playlists = this.props.userPlaylists;
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <List className="sidebar-flexlist">
                        {playlists ? playlists.map((result, index) => <SidebarItem key={index} title={result.Title} creator={result.Creator} ></SidebarItem>) : <ListItem>loading...</ListItem>}
                    </List>
                </div>
            </div>
        );
    }
}

export default Sidebar;