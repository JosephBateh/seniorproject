import React, {Component} from 'react';
import './ListItem.css';

class ListItem extends Component {
    render() {
        return (
            <li className="list-item">
                <span className="list-item-song">{this.props.title}</span>
                <span className="list-item-info">{this.props.artist} - {this.props.album}</span>
            </li>
        );
    }
}

export default ListItem;