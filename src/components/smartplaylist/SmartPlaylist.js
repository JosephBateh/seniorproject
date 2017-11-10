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
				attribute: "playlist",
				matches: [true, false],
				values: this.props.playlists,
				state: { match: 0, value: 0 }
			}
		],
		open: false
	};

	componentDidUpdate() {
		if (!this.state.rules[0].values) {
			this.setState({
				rules: [
					{
						attribute: "playlist",
						matches: [true, false],
						values: this.props.playlists,
						state: { match: 0, value: 0 }
					}
				],
				name: null
			});
		}
	}

	addRule = () => {
		var newRules = this.state.rules;
		newRules.push({
			attribute: "playlist",
			matches: [true, false],
			values: this.props.playlists,
			state: { match: 0, value: 0 }
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
		var newState = newRule.state;
		newState.match = value;
		newRule.state = newState;
		rules.splice(rule, 1, newRule);
		this.setState({
			rules: rules
		});
	};

	changeValue = (rule, value) => {
		var rules = this.state.rules;
		var newRule = rules[rule];
		var newState = newRule.state;
		newState.value = value;
		newRule.state = newState;
		rules.splice(rule, 1, newRule);
		this.setState({
			rules: rules
		});
	};

	save = () => {
		if (!this.state.name) {
			this.setState({
				open: true
			});
			return;
		}
		var rules = [];
		this.state.rules.map((rule, index) => {
			var match = rule.matches[rule.state.match];
			var value = rule.values[rule.state.value];
			var newRule = {
				user: this.props.user,
				attribute: rule.attribute,
				match: match,
				value: value.UUID
			};
			rules.push(newRule);
			return newRule;
		});
		var playlist = {
			name: this.state.name,
			rules: rules
		};
		console.log(playlist);
		Server.saveSmartPlaylist(playlist);
	};

	onNameChange = (e, value) => {
		this.setState({
			name: value
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false
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
						match={rule.state.match}
						value={rule.state.value}
						playlists={this.props.playlists}
						addRule={this.addRule}
						deleteRule={this.deleteRule}
						changeMatch={this.changeMatch}
						changeValue={this.changeValue}
					/>
				))}
				<Snackbar
					open={this.state.open}
					message="Please add a name for your playlist"
					autoHideDuration={3000}
					onRequestClose={this.handleRequestClose}
				/>
			</div>
		);
	}
}

export default SmartPlaylist;
