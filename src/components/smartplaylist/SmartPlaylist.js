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

    render() {
        return (
            <div style={{ margin: 15 }}>
                {this.state.rules.map((rule, index) => (
                    <Rule
                        key={index}
                        attribute={rule.attribute}
                        is={rule.is}
                        value={rule.value}
                        playlists={this.props.playlists}
                    />
                ))}
            </div>
        );
    }
}

export default SmartPlaylist;
