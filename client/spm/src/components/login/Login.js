import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as API from '../../helpers/API.js';

class Login extends Component {
    authorize = () => {
        API.authorize();
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