import React, { Component } from 'react';
import './App.css';
import Timer from './Timer'
import Converter from './Converter'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer></Timer>
        <Converter></Converter>
      </div>
    );
  }
}

export default App;
