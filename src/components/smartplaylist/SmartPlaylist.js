import React, { Component } from "react";
import Rule from "./Rule";

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
			</div>
		);
	}
}

export default SmartPlaylist;
