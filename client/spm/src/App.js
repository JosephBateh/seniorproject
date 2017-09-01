import React, { Component } from 'react';
import './App.css';
import Timer from './Timer'
import List from './List'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer></Timer>
        <List></List>
      </div>
    );
  }
}

export default App;
