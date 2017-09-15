import React, { Component } from 'react';
import './App.css';
import List from '../playlist/Playlist';
import Sidebar from '../sidebar/Sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
            <span className="spm-module">
              <Sidebar></Sidebar>
              <List></List>
            </span>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
