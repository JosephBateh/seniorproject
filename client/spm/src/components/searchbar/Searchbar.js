import React, {Component} from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Searchbar extends Component {
    onChange = (e, value) => {
        this.props.onTextChange(value);
    }

    searchButtonClicked = () => {
        return this.props.onSearch();
    }
    
    render() {
        return (
            <div className="searchbar">
                <Toolbar>
                    <ToolbarGroup>
                        <TextField
                            hintText="Search..."
                            onChange={this.onChange}
                            defaultValue={this.props.text}
                        />
                        <FlatButton
                            label="Search"
                            onClick={this.searchButtonClicked}
                        />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

export default Searchbar;