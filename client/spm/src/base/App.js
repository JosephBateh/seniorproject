import React, { Component } from 'react';
import './App.css';
import List from '../playlist/Playlist';
import Sidebar from '../sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <span className="spm-module">
            <Sidebar></Sidebar>
            <List></List>
        </span>
      </div>
    );
  }
}

export default App;
