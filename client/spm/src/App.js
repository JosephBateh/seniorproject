import React, { Component } from 'react';
import './App.css';
import Timer from './Timer'
import List from './List'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer></Timer>
        <span className="spm-module">
            <List></List>
        </span>
      </div>
    );
  }
}

export default App;
