import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';

class SearchItemMenuOption extends Component {
    onClick = (e) => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <MenuItem primaryText={this.props.text} onClick={this.onClick}></MenuItem>
        );
    }
}

export default SearchItemMenuOption;