import React, { Component } from "react";
import Rule from "./Rule";
import Loading from "../loading/Loading";

class SmartPlaylist extends Component {
	state = {
		rules: []
	};

	render() {
		return this.state.rules ? (
			<div style={{ margin: 15 }}>
				<Rule playlists={this.props.playlists} />
			</div>
		) : (
			<Loading />
		);
	}
}

export default SmartPlaylist;
