import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreIcon from "material-ui/svg-icons/navigation/more-horiz";

const MoreMenu = () => (
    <IconMenu
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        targetOrigin={{ horizontal: "left", vertical: "bottom" }}
        iconButtonElement={
            <IconButton tooltip="more">
                <MoreIcon />
            </IconButton>
        }
    >
        <MenuItem
            primaryText="Add to playlist"
            menuItems={[
                <MenuItem primaryText="UPPERCASE" />,
                <MenuItem primaryText="lowercase" />,
                <MenuItem primaryText="CamelCase" />,
                <MenuItem primaryText="Propercase" />
            ]}
        />
    </IconMenu>
);

export default MoreMenu;
