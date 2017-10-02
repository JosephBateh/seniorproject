import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const redirectURI = 'http://localhost:3000/callback/';
const clientID = 'd34404005f6c45359f360c9e1dd4bac6';

class Login extends Component {
    constructor(props) {
        super(props);

        //this.getToken = this.getToken.bind(this);
        this.authorize = this.authorize.bind(this);
        //this.login = this.login.bind(this);
    }

    // Implicit Grant Flow Authorization
    authorize() {
        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(clientID);
        url += '&redirect_uri=' + encodeURIComponent(redirectURI);
        //window.location = url; 
        
        fetch('/authorize', {
            method: 'GET',
        })
        .then( () => {
            window.location = url;
        })
        .catch(e => {
            console.log(e);
        });

        // axios({
        //     method: 'GET',
        //     baseURL: 'https://accounts.spotify.com',
        //     url: '/authorize',
        //     params: {
        //         response_type: 'token',
        //         client_id: encodeURIComponent(clientID),
        //         redirect_uri: encodeURIComponent(redirectURI)
        //     }
        //   })
        //   .then( res => res.JSON.stringify(res))
        //   .then( token => {
        //     console.log("testing");
        //     localStorage.setItem('authToken', token);
        //     window.location = url;
        //   })
        //   .catch(function(err) {
        //       console.log(err);
        //   });
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