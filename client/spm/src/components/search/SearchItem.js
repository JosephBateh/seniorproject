import React, { Component } from "react";
import { ListItem as Item } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import MoreIcon from "material-ui/svg-icons/navigation/more-horiz";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import SearchItemMenuOption from "./SearchItemMenuOption";

class SearchItem extends Component {
    state = {
        playlists: null
    };

    moreButtonClicked = e => {
        console.log(this.props.id);
    };

    addToPlaylist = playlist => {
        this.props.addToPlaylist(this.props.id, playlist);
    };

    render() {
        const playlists = this.props.playlists;
        var playlistArray = [];

        for (var index in playlists) {
            playlistArray.push(
                <SearchItemMenuOption
                    text={playlists[index].Title}
                    id={playlists[index].UUID}
                    onClick={this.addToPlaylist}
                />
            );
        }

        return (
            <Item
                className="playlist-item"
                primaryText={<p className="playlist-item-title">{this.props.title}</p>}
                secondaryText={
                    <p className="playlist-item-info">
                        {this.props.artist} - {this.props.album}
                    </p>
                }
                rightIconButton={
                    <IconMenu
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        targetOrigin={{ horizontal: "left", vertical: "bottom" }}
                        iconButtonElement={
                            <IconButton tooltip="more">
                                <MoreIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem primaryText="Add to playlist" menuItems={playlistArray} />
                    </IconMenu>
                }
            />
        );
    }
}

export default SearchItem;
