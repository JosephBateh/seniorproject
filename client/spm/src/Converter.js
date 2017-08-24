import React, {Component} from 'react';

class Converter extends Component {
    getRequest() {
        
    }
    
    render() {
        return (
          <div className="App">
            <p>Number Converter</p>
            <div>
              Number:
              <input type="text"></input><br />
              Base:
              <input type="text"></input><br />
              New Base:
              <input type="text"></input><br />
            </div>
            <button onClick={this.getRequest}>Convert</button>
          </div>
        );
      }
}

export default Converter;