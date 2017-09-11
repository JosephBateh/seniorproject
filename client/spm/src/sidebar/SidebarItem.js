import React, {Component} from 'react';

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