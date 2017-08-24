import React, { Component } from 'react'

class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
    
    render () {
      return (
        <div className="Timer">
          <p>
          Date:
          It is {this.state.date.toLocaleTimeString()}.
          </p>
        </div>
      );
    }
}

export default Timer