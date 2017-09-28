import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const redirect_uri = 'http://localhost:3000';

class Login extends Component {
    constructor(props) {
        super(props);

        this.getToken = this.getToken.bind(this);
        //this.authorize = this.authorize.bind(this);
        //this.login = this.login.bind(this);
    }

    getToken() {
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
        })
        .then(res => res.json())
        .then(({code}) => {
            window.location = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${redirect_uri}`;
            window.location = 'GET https://accounts.spotify.com/authorize/?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09';
        });
    }

    render() {
        return (
            <div>
                <RaisedButton label="Login to Spotify" fullWidth={true} onClick={this.login} />
            </div>
        );
    }
}

export default Login;