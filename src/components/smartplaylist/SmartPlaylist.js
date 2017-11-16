import React, { Component } from "react";
import Rule from "./Rule";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import * as Server from "../../helpers/Server";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";

class SmartPlaylist extends Component {
    state = {
        rules: [
            {
                attribute: 0,
                match: 0,
                value: 0,
                valueList: this.props.playlists
            }
        ],
        nameEmpty: false,
        saveSuccess: false,
        attributeList: ["playlist", "plays"],
        matchList: ["is", "is not", "greater", "less"]
    };

    componentDidMount() {
        Server.getRuleAttributes().then(attributes => {
            this.setState({
                attributeList: attributes
            });
        });
    }

    addRule = () => {
        var newRules = this.state.rules;
        newRules.push({
            attribute: 0,
            match: 0,
            value: 0,
            valueList: this.props.playlists
        });
        this.setState({
            rules: newRules
        });
    };

    deleteRule = rule => {
        var newRules = this.state.rules;
        if (newRules.length > 1) {
            newRules.splice(rule, 1);
        }
        this.setState({
            rules: newRules
        });
    };

    changeMatch = (rule, value) => {
        var rules = this.state.rules;
        var newRule = rules[rule];
        newRule.match = value;
        rules.splice(rule, 1, newRule);
        this.setState({
            rules: rules
        });
    };

    changeAttribute = (rule, value) => {
        var rules = this.state.rules;
        var newRule = rules[rule];
        newRule.attribute = value;
        rules.splice(rule, 1, newRule);
        this.setState({
            rules: rules
        });
    };

    changeValue = (rule, value) => {
        var rules = this.state.rules;
        var newRule = rules[rule];
        newRule.value = value;
        rules.splice(rule, 1, newRule);
        this.setState({
            rules: rules
        });
    };

    save = () => {
        if (!this.state.name) {
            this.setState({
                nameEmpty: true
            });
            return;
        }
        var rules = [];
        this.state.rules.map((rule, index) => {
            var attribute = this.state.attributeList[rule.attribute];
            var match = this.state.matchList[rule.match];

            var value;
            if (attribute === "plays") {
                value = rule.value;
            } else {
                value = this.props.playlists[rule.value].UUID;
            }

            var newRule = {
                attribute: attribute,
                match: match,
                value: value
            };
            rules.push(newRule);
            return newRule;
        });
        var playlist = {
            name: this.state.name,
            user: this.props.user,
            rules: rules
        };
        Server.saveSmartPlaylist(playlist).then(response => {
            if (response && response.status === 200) {
                this.smartPlaylistSuccess();
            } else {
                console.log(response);
            }
        });
    };

    onNameChange = (e, value) => {
        this.setState({
            name: value
        });
    };

    handleRequestClose = () => {
        this.setState({
            nameEmpty: false
        });
    };

    smartPlaylistSuccess = () => {
        this.setState({
            saveSuccess: true
        });
    };

    handleSuccessClose = () => {
        this.setState({
            saveSuccess: false
        });
    };

    render() {
        const rules = this.state.rules;
        return (
            <div style={{ margin: 15 }}>
                <Toolbar style={{ backgroundColor: "white" }}>
                    <ToolbarGroup firstChild={true}>
                        <TextField
                            hintText="Playlist Name..."
                            onChange={this.onNameChange}
                            defaultValue={this.state.name}
                        />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <FlatButton label="Save" onClick={this.save} />
                    </ToolbarGroup>
                </Toolbar>
                <Divider />
                {rules.map((rule, index) => (
                    <Rule
                        key={index}
                        index={index}
                        attribute={rule.attribute}
                        attributeList={this.state.attributeList}
                        match={rule.match}
                        matchList={this.state.matchList}
                        value={rule.value}
                        playlists={this.props.playlists}
                        addRule={this.addRule}
                        deleteRule={this.deleteRule}
                        changeMatch={this.changeMatch}
                        changeValue={this.changeValue}
                        changeAttribute={this.changeAttribute}
                    />
                ))}
                <Snackbar
                    open={this.state.nameEmpty}
                    message="Please add a name for your playlist"
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                />
                <Snackbar
                    open={this.state.saveSuccess}
                    message="Smart playlist saved successfully"
                    autoHideDuration={3000}
                    onRequestClose={this.handleSuccessClose}
                />
            </div>
        );
    }
}

export default SmartPlaylist;
