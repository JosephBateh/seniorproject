import React, {Component} from 'react';
import './ListItem.css';

class ListItem extends Component {
    render() {
        return (
            <li className="listItem">
                <span>{this.props.title}</span>
                <span>{this.props.artist}</span>
                <span>{this.props.album}</span>
            </li>
        );
    }
}

export default ListItem;