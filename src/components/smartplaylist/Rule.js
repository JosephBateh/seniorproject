import React, { Component } from "react";
import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import Add from "material-ui/svg-icons/content/add";
import Remove from "material-ui/svg-icons/content/remove";
import Loading from "../loading/Loading";

class Rule extends Component {
    render() {
        const playlists = this.props.playlists;
        return playlists ? (
            <div>
                <Divider />
                <Toolbar style={{ backgroundColor: "white" }}>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={0}>
                            <MenuItem value={0} primaryText="Playlist" />
                        </DropDownMenu>
                        <DropDownMenu value={0}>
                            <MenuItem value={0} primaryText="is" />
                            <MenuItem value={1} primaryText="is not" />
                        </DropDownMenu>
                        <DropDownMenu value={0}>
                            {playlists.map((playlist, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        value={index}
                                        primaryText={playlist.Title}
                                    />
                                );
                            })}
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <div>
                            <FlatButton icon={<Remove />} />
                            <FlatButton icon={<Add />} />
                        </div>
                    </ToolbarGroup>
                </Toolbar>
                <Divider />
            </div>
        ) : (
            <Loading />
        );
    }
}

export default Rule;
