import React, { Component } from "react";
import Rule from "./Rule";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import Save from "material-ui/svg-icons/content/save";
import * as Server from "../../helpers/Server";

class SmartPlaylist extends Component {
	state = {
		rules: [
			{
				attribute: "playlist",
				matches: [true, false],
				values: this.props.playlists,
				state: { match: 0, value: 0 }
			}
		]
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
				]
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
		var rules = [];
		this.state.rules.map((rule, index) => {
			var match = rule.matches[rule.state.match];
			var value = rule.values[rule.state.value];
			var newRule = {
				attribute: rule.attribute,
				match: match,
				value: value.UUID
			};
			rules.push(newRule);
			return newRule;
		});
		console.log(rules);
		Server.saveSmartPlaylist(rules);
	};

	render() {
		const rules = this.state.rules;
		return (
			<div style={{ margin: 15 }}>
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
				<Divider />
				<Toolbar style={{ backgroundColor: "white" }}>
					<ToolbarGroup lastChild={true}>
						<div>
							<FlatButton onClick={this.save} icon={<Save />} />
						</div>
					</ToolbarGroup>
				</Toolbar>
			</div>
		);
	}
}

export default SmartPlaylist;
