import React, {Component} from 'react';
import './SidebarItem.css'
import Divider from 'material-ui/Divider';

class SidebarItem extends Component {
    render() {
        return (
            <li className="sidebar-item">
                <label>{this.props.title}</label>
                <Divider></Divider>
            </li>
        );
    }
}

export default SidebarItem;