import React, {Component} from 'react';
import './ListItem.css';

class ListItem extends Component {
    render() {
        return (
            <tr className="listItem">
                <td>Song: {this.props.title}</td>
                <td>Artist: {this.props.artist}</td>
                <td>Album: {this.props.album}</td>
            </tr>
        );
    }
}

export default ListItem;