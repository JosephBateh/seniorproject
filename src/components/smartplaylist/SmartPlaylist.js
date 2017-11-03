import React, { Component } from "react";
import Rule from "./Rule";

class SmartPlaylist extends Component {
    state = {
        rules: [
            {
                attribute: "playlist",
                is: true,
                value: "Maroon 5"
            }
        ]
    };

    addRule = () => {
        var newRules = this.state.rules;
        newRules.push({
            attribute: "playlist",
            is: true,
            value: "Maroon 5"
        });
        this.setState({
            rules: newRules
        });
    };

    deleteRule = rule => {
        var newRules = this.state.rules.filter();
        this.setState({
            rules: newRules
        });
    };

    render() {
        const rules = this.state.rules;
        return (
            <div style={{ margin: 15 }}>
                {rules.map((rule, index) => (
                    <Rule
                        key={index}
                        attribute={rule.attribute}
                        is={rule.is}
                        value={rule.value}
                        playlists={this.props.playlists}
                        addRule={this.addRule}
                        deleteRule={this.deleteRule}
                    />
                ))}
            </div>
        );
    }
}

export default SmartPlaylist;
