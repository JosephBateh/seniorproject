import React, {Component} from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);

        if (props.text) {
            this.state = {
                text: props.text
            }
        } else {
            this.state = {
                text: null
            }
        }
    }

    onChange(e, value) {
        this.setState({
            text: value
        });
        this.props.onTextChange(value);
    }

    searchButtonClicked() {
        this.props.searchButtonClicked(this.state.text);
    }
    
    render() {
        const searchBarText = this.state.text;

        return (
            <div className="searchbar">
                <Toolbar>
                    <ToolbarGroup>
                        <TextField hintText="Search..." onChange={this.onChange} defaultValue={searchBarText}></TextField>
                        <FlatButton label="Search" onClick={this.searchButtonClicked}></FlatButton>
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }
}

export default Searchbar;