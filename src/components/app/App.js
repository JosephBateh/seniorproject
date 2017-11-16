import React, { Component } from "react";
import Playlist from "../playlist/Playlist";
import Sidebar from "../sidebar/Sidebar";
import Search from "../search/Search";
import Searchbar from "../searchbar/Searchbar";
import SmartPlaylist from "../smartplaylist/SmartPlaylist";
import * as API from "../../helpers/API.js";
import { withRouter, Route, Redirect } from "react-router-dom";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";

class App extends Component {
    state = {
        playlist: null,
        listPlaylists: null,
        search: null,
        searchList: null,
        createPlaylist: false,
        errorText: "",
        noPlaylists: false
    };

    getPlaylists = () => {
        API.getPlaylists().then(playlists => {
            var initialPlaylist = playlists[0];
            var createPlaylist = false;
            if (initialPlaylist) {
                initialPlaylist = playlists[0].UUID;
            } else {
                initialPlaylist = null;
                createPlaylist = true;
            }
            this.setState({
                listPlaylists: playlists,
                playlist: initialPlaylist,
                noPlaylists: createPlaylist
            });
        });
    };

    getPlaylistItems = () => {
        API.getPlaylistItems(this.state.playlist).then(items => {
            this.setState({
                playlistItems: items
            });
        });
    };

    handlePlaylistChange = value => {
        this.setState(
            {
                playlist: value
            },
            () => {
                this.props.history.push("/playlist");
            }
        );
    };

    newSmartPlaylist = () => {
        this.props.history.push("/smartplaylist");
    };

    deleteItems = value => {
        var newItems = this.state.playlistItems.filter(item => item.ID !== value);

        API.deleteItems([value], this.state.playlist).then(retVal => {
            if (retVal.status === 200) {
                this.setState({
                    playlistItems: newItems
                });
            }
        });
    };

    componentWillMount() {
        if (API.getToken()) {
            this.getPlaylists();
        }
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextState.playlist !== this.state.playlist) {
            this.getPlaylistItems();
        }
        if (
            nextState.createPlaylist !== this.state.createPlaylist ||
            nextState.noPlaylists !== this.state.noPlaylists
        ) {
            this.getPlaylists();
        }
    }

    changeSearchText = search => this.setState({ search });

    search = () => {
        // API call fails if currentSearch is null or empty
        if (this.state.search) {
            this.props.history.push("/search");

            // Populate search view components
            API.searchSpotify(this.state.search)
                .then(data => {
                    // Parse JSON into my model
                    var x = data.data.tracks.items.map(item => {
                        x = {
                            ID: item.id,
                            Title: item.name,
                            Artist: item.artists[0].name,
                            Album: item.album.name
                        };
                        return x;
                    });
                    return x;
                })
                .then(x => {
                    this.setState({
                        searchList: x
                    });
                });
        }
    };

    submitButtonPressed = () => {
        if (this.state.playlistName) {
            this.setState({
                createPlaylist: false,
                noPlaylists: false,
                errorText: ""
            });
            API.createPlaylist(this.state.playlistName).then(retVal => {
                if (retVal.status === 200) {
                    this.getPlaylists();
                }
            });
        } else {
            this.setState({
                errorText: "Please enter a name"
            });
        }
    };

    handleClose = () => {
        this.setState({
            createPlaylist: false
        });
    };

    newNormalPlaylist = () => {
        this.setState({
            createPlaylist: true
        });
    };

    playlistNameChange = (e, value) => {
        this.setState({
            playlistName: value
        });
    };

    logout = () => {
        API.logout();
    };

    render() {
        if (!API.getToken()) {
            return <Redirect to="/login" />;
        }
        if (this.props.location.pathname === "/") {
            return <Redirect to="/playlist" />;
        }
        if (this.props.location.pathname === "/search" && !this.state.search) {
            return <Redirect to="/playlist" />;
        }
        const user = API.getUserID();
        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.submitButtonPressed}
            />
        ];
        const onlySubmit = [
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.submitButtonPressed}
            />
        ];
        return (
            <div className="App">
                <Sidebar
                    currentPlaylist={this.state.playlist}
                    playlists={this.state.listPlaylists}
                    onClick={this.handlePlaylistChange}
                    newSmartPlaylist={this.newSmartPlaylist}
                    newNormalPlaylist={this.newNormalPlaylist}
                />
                <div className="main-content">
                    <Searchbar
                        onTextChange={this.changeSearchText}
                        onSearch={this.search}
                        text={this.state.search}
                        logout={this.logout}
                    />
                    <Route
                        path="/playlist"
                        render={() =>
                            this.state.playlist ? (
                                <Playlist
                                    items={this.state.playlistItems}
                                    deleteItems={this.deleteItems}
                                />
                            ) : (
                                <div>Loading</div>
                            )}
                    />
                    <Route
                        path="/search"
                        render={() => (
                            <Search
                                items={this.state.searchList}
                                playlists={this.state.listPlaylists}
                            />
                        )}
                    />
                    <Route
                        path="/smartplaylist"
                        render={() => (
                            <SmartPlaylist user={user} playlists={this.state.listPlaylists} />
                        )}
                    />
                </div>
                <Dialog
                    title="Create Playlist"
                    actions={actions}
                    modal={false}
                    open={this.state.createPlaylist}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        errorText={this.state.errorText}
                        onChange={this.playlistNameChange}
                        hintText="Hot New Mixtape"
                    />
                </Dialog>
                <Dialog
                    title="Please Create a Playlist"
                    actions={onlySubmit}
                    modal={false}
                    open={this.state.noPlaylists}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        errorText={this.state.errorText}
                        onChange={this.playlistNameChange}
                        hintText="Hot New Mixtape"
                    />
                </Dialog>
            </div>
        );
    }
}

export default withRouter(App);
