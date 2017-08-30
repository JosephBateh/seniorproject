import React, {Component} from 'react';

class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // number: 0,
            // base: 10,
            // newBase: 10
        };
        this.convertButtonPressed = this.convertButtonPressed.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    convertButtonPressed(event) {
        console.log("Number:", this.state.number);
        console.log("Base:", this.state.base);
        console.log("New Base:", this.state.newBase);
    }
    
    render() {
        return (
          <div className="App">
            <p>Number Converter</p>
            <div>
              Number:
              <input name="number" onChange={this.handleChange} type="text" placeholder="Number"></input><br />
              Base:
              <input name="base" onChange={this.handleChange} type="text" placeholder="Base"></input><br />
              New Base:
              <input name="newBase" onChange={this.handleChange} type="text" placeholder="New Base"></input><br />
            </div>
            <button onClick={this.convertButtonPressed}>Convert</button>
          </div>
        );
      }
}

export default Converter;