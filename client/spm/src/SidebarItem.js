import React, {Component} from 'react';

class SidebarItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="sidebar-item">
                <label>{this.props.title}</label>
            </li>
        );
    }
}

export default SidebarItem;