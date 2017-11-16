import React, { Component } from "react";
import MenuItem from "material-ui/MenuItem";
import DropDownMenu from "material-ui/DropDownMenu";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import Add from "material-ui/svg-icons/content/add";
import Remove from "material-ui/svg-icons/content/remove";
import Loading from "../loading/Loading";
import TextField from "material-ui/TextField";

class Rule extends Component {
    addRule = () => {
        this.props.addRule();
    };

    deleteRule = () => {
        this.props.deleteRule(this.props.index);
    };

    changeMatch = (event, key, value) => {
        this.props.changeMatch(this.props.index, key);
    };

    changeValue = (event, key, value) => {
        this.props.changeValue(this.props.index, key);
    };

    changeAttribute = (event, key, value) => {
        this.props.changeAttribute(this.props.index, key);
    };

    render() {
        const playlists = this.props.playlists;
        const matchList = this.props.matchList;
        var nonPlayMatchlist = [];
        nonPlayMatchlist.push(matchList[0], matchList[1]);
        return playlists ? (
            <div>
                <Divider />
                <Toolbar style={{ backgroundColor: "white" }}>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.props.attribute} onChange={this.changeAttribute}>
                            {this.props.attributeList.map((attribute, index) => {
                                return (
                                    <MenuItem key={index} value={index} primaryText={attribute} />
                                );
                            })}
                        </DropDownMenu>
                        {this.props.attributeList[this.props.attribute] === "plays" ? (
                            <DropDownMenu value={this.props.match} onChange={this.changeMatch}>
                                {this.props.matchList.map((match, index) => {
                                    return (
                                        <MenuItem key={index} value={index} primaryText={match} />
                                    );
                                })}
                            </DropDownMenu>
                        ) : (
                            <DropDownMenu value={this.props.match} onChange={this.changeMatch}>
                                {nonPlayMatchlist.map((match, index) => {
                                    return (
                                        <MenuItem key={index} value={index} primaryText={match} />
                                    );
                                })}
                            </DropDownMenu>
                        )}
                        {this.props.attributeList[this.props.attribute] === "plays" ? (
                            <TextField id="text_field" onChange={this.changeValue} />
                        ) : (
                            <DropDownMenu value={this.props.value} onChange={this.changeValue}>
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
                        )}
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                        <div>
                            <FlatButton onClick={this.deleteRule} icon={<Remove />} />
                            <FlatButton onClick={this.addRule} icon={<Add />} />
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
