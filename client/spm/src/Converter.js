import React, {Component} from 'react';

class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = {isClicked: true};
        this.getRequest = this.getRequest.bind(this);
    }
    
    getRequest() {
        console.log(this.state.isClicked);
        this.setState(prevState => ({
            isClicked: !prevState.isClicked
        }));
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