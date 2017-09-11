import React, {Component} from 'react';
import './SidebarItem.css'

class SidebarItem extends Component {
    render() {
        return (
            <li className="sidebar-item">
                <label>{this.props.title}</label>
            </li>
        );
    }
}

export default SidebarItem;