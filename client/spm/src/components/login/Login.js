import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
    constructor(props) {
        super(props);

        this.authorize = this.authorize.bind(this);
    }

    // Implicit Grant Flow Authorization
    authorize() {
        var redirectURI = 'http://localhost:3000/callback/';

        if (process.env.NODE_ENV === 'production') {
            redirectURI = process.env.REACT_APP_REDIRECT_URI;
        }

        var apiScope = 'playlist-read-private';
        apiScope += ' playlist-modify-public';
        apiScope += ' playlist-modify-private';
        apiScope += ' user-library-read';
        apiScope += ' user-library-modify';
        apiScope += ' user-read-currently-playing';
        apiScope += ' user-read-recently-played';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(process.env.REACT_APP_CLIENT_ID);
        url += '&redirect_uri=' + encodeURIComponent(redirectURI);
        url += '&scope=' + apiScope;
        
        fetch('/authorize', {
            method: 'GET',
        })
        .then( () => {
            window.location = url;
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <RaisedButton label="Login to Spotify" fullWidth={true} onClick={this.authorize} />
            </div>
        );
    }
}

export default Login;