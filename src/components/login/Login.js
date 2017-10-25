import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import * as API from "../../helpers/API.js";

class Login extends Component {
	state = {
		open: false
	};

	authorize = () => {
		API.authorize();
	};

	loginClicked = () => {
		this.setState({
			open: true
		});
	};

	cancelClicked = () => {
		this.setState({
			open: false
		});
	};

	render() {
		const actions = [
			<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
			<FlatButton label="Login" primary={true} onClick={this.authorize} />
		];
		return (
			<div>
				<RaisedButton
					label="Login to Spotify"
					fullWidth={true}
					onClick={this.loginClicked}
				/>
				<Dialog
					title="Server Authentication"
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					When you login, you will be allowing the server to make API requests on your
					behalf.
				</Dialog>
			</div>
		);
	}
}

export default Login;
