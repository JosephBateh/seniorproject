import React, { Component } from "react";
import SidebarItem from "./SidebarItem";
import Drawer from "material-ui/Drawer";
import { List, ListItem } from "material-ui/List";
import FlatButton from "material-ui/FlatButton";
import SmartAdd from "material-ui/svg-icons/av/playlist-add";
import AddButton from "material-ui/svg-icons/content/add-circle-outline";
import { BottomNavigation, BottomNavigationItem } from "material-ui/BottomNavigation";

class Sidebar extends Component {
	onClick = value => {
		this.props.onClick(value);
	};

	newSmartPlaylist = () => {
		this.props.newSmartPlaylist();
	};

	render() {
		const playlists = this.props.playlists;
		return (
			<Drawer className="sidebar" open={true}>
				<BottomNavigation>
					<BottomNavigationItem label="Playlist" icon={<AddButton />} />
					<BottomNavigationItem
						label="Smart Playlist"
						icon={<SmartAdd />}
						onClick={this.newSmartPlaylist}
					/>
				</BottomNavigation>
				<List className="sidebar-flexlist">
					{playlists ? (
						playlists.map((playlist, index) => (
							<SidebarItem
								id={playlist.UUID}
								onClick={this.onClick}
								key={index}
								title={playlist.Title}
								creator={playlist.Creator}
							/>
						))
					) : (
						<ListItem>loading...</ListItem>
					)}
				</List>
			</Drawer>
		);
	}
}

export default Sidebar;
