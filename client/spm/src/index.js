import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import Login from './components/login/Login';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Root extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={App}>

                        </Route>
                        <Route path="/login" component={Login}>
                            
                        </Route>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
registerServiceWorker();
