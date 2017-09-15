import React, {Component} from 'react';
import './SidebarItem.css'
import {ListItem} from 'material-ui/List';

class SidebarItem extends Component {
    render() {
        return (
            <ListItem className="sidebar-item" primaryText={<p>{this.props.title}</p>}/>
        );
    }
}

export default SidebarItem;