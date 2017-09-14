import React, { Component } from 'react';
import './App.css';
import List from '../playlist/Playlist';
import Sidebar from '../sidebar/Sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <span className="spm-module">
            <Sidebar></Sidebar>
            <List></List>
          </span>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
