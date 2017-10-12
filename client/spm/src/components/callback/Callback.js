import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as API from '../../helpers/API.js';

class Callback extends Component {
    componentWillMount() {
        var token = window.location.hash.split('=')[1].split('&')[0];
        API.setToken(token);
    }

    render() {
        return API.getToken() ? (
            <Redirect to="/app"/>
        ) : (
            <div>
                Loading...
            </div>
        );
    }
}

export default Callback;