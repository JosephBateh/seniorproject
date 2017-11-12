import React, { Component } from "react";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

class Searchbar extends Component {
    onChange = (e, value) => {
        this.props.onTextChange(value);
    };

    searchButtonClicked = () => {
        return this.props.onSearch();
    };

    logoutButtonClicked = () => {
        return this.props.logout();
    };

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
                        <FlatButton label="Search" onClick={this.searchButtonClicked} />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <FlatButton label="Logout" onClick={this.logoutButtonClicked} />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

export default Searchbar;
