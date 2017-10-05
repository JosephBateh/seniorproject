import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';

class SidebarItem extends Component {    
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.props.id);
    }
    
    render() {
        return (
            <ListItem onClick={this.onClick} className="sidebar-item" primaryText={<p>{this.props.title}</p>}/>
        );
    }
}

export default SidebarItem;