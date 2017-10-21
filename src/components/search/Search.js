import React, { Component } from "react";
import { List } from "material-ui/List";
import SearchItem from "../search/SearchItem";
import Loading from "../loading/Loading";
import * as API from "../../helpers/API";

class Search extends Component {
    addToPlaylist = (item, playlist) => {
        API.addItemsToPlaylist([item], playlist);
    };

    render() {
        const { items, playlists } = this.props;

        return this.props.items ? (
            <div>
                <List>
                    {items ? (
                        items.map((item, index) => (
                            <SearchItem
                                key={index}
                                title={item.Title}
                                artist={item.Artist}
                                album={item.Album}
                                id={item.ID}
                                playlists={playlists}
                                addToPlaylist={this.addToPlaylist}
                            />
                        ))
                    ) : (
                        <SearchItem>Loading...</SearchItem>
                    )}
                </List>
            </div>
        ) : (
            <Loading />
        );
    }
}

export default Search;
