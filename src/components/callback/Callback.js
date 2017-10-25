import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import * as API from "../../helpers/API";
import * as Server from "../../helpers/Server";

class Callback extends Component {
    state = {
        userID: null
    };

    componentWillMount() {
        sessionStorage.clear();
        var token = window.location.hash.split("=")[1].split("&")[0];
        API.setToken(token);

        Server.serverAuth().then(x => {
            console.log(x);
            window.open(x);
        });

        // The code block below attempts to force userID
        // to be set before moving to the app
        API.getUser(token).then(ID => {
            API.setUserID(ID);
            this.setState({
                userID: ID
            });
        });
    }

    render() {
        return this.state.userID ? <Redirect to="/playlist" /> : <div>Loading...</div>;
    }
}

export default Callback;
