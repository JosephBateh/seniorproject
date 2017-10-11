import React, {Component} from 'react';

class Callback extends Component {
    componentWillMount() {
        var token = window.location.hash.split('=')[1].split('&')[0];
        this.props.updateUserToken(token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userToken) {
            window.location = "/app"
        }
    }

    render() {
        console.log("RENDER: " + this.props.userToken);
        return (
            <div>
                Loading...
            </div>
        );
    }
}

export default Callback;