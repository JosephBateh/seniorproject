import React, { Component } from "react";
import "./Playlist.css";
import { List, ListItem as Item } from "material-ui/List";
import PlaylistItem from "./PlaylistItem";

class Playlist extends Component {
	deleteItems = items => {
		this.props.deleteItems(items);
	};

	render() {
		const items = this.props.items;

		return (
			<div>
				<List>
					{items ? (
						items.map((item, index) => (
							<PlaylistItem
								key={index}
								title={item.Title}
								artist={item.Artist}
								album={item.Album}
								id={item.ID}
								delete={this.deleteItems}
							/>
						))
					) : (
						<Item>Loading...</Item>
					)}
				</List>
			</div>
		);
	}
}

export default Playlist;
