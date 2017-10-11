import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Callback extends Component {
    componentDidMount() {
        var token = window.location.hash.split('=')[1].split('&')[0];
        this.props.updateUserToken(token);
    }

    render() {
        console.log("RENDER: " + this.props.userToken);
        return this.props.userToken ? (
            <Redirect to="/app" />
        ) : (
            <div>
                Loading...
            </div>
        );
    }
}

export default Callback;
