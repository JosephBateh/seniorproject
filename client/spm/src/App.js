import React, { Component } from 'react';
import './App.css';
import List from './List'

class App extends Component {
  render() {
    return (
      <div className="App">
        <span className="spm-module">
            <List></List>
        </span>
      </div>
    );
  }
}

export default App;
