import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import Login from './components/login/Login';
import Search from './components/search/Search';
import Callback from './components/callback/Callback';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Root extends Component {
    state = {
        currentPlaylist: null,
        userID: null,
        userToken: null
    }

    updateState = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    updateUserID = (value) => {
        this.updateState('userID', value);
    }

    updateUserToken = (value) => {
        this.updateState('userToken', value);
    }

    updateCurrentPlaylist = (value) => {
        this.updateState('currentPlaylist', value);
    }


    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login}/>

                        <Route path="/callback" render={
                                () => {
                                    return (
                                        <Callback
                                            updateUserToken={this.updateUserToken}
                                            userToken={this.state.userToken}
                                        />
                                    );
                                }
                            }
                        />
                        
                        <Route
                            path="/app"
                            render={
                                () => {
                                    return (
                                        <App 
                                            updateUserID={this.updateUserID}
                                            updateUserToken={this.updateUserToken}
                                            userToken={this.state.userToken}
                                        />
                                    );
                                }
                            }
                        />

                        <Route path="/search" component={Search}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
registerServiceWorker();
