import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const clientID = 'd34404005f6c45359f360c9e1dd4bac6';

class Login extends Component {
    constructor(props) {
        super(props);

        this.authorize = this.authorize.bind(this);
    }

    // Implicit Grant Flow Authorization
    authorize() {
        var redirectURI = 'http://localhost:3000/callback/';

        if (process.env.REACT_APP_ENV === 'production') {
            redirectURI = 'http://dev.josephbateh.com/callback/';
        }

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(clientID);
        url += '&redirect_uri=' + encodeURIComponent(redirectURI);
        
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