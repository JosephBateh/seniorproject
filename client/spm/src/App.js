import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          Number:
          <input type="text"></input>
          Base:
          <input type="text"></input>
          New Base:
          <input type="text"></input>
        </div>
        <button>I Dare You</button>
      </div>
    );
  }
}

export default App;
