import React, {Component} from 'react';
import axios from 'axios';

class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        axios({
            method: 'GET',
            baseURL: 'http://localhost:4000/',
            url: '/numberconverter',
            params: {
              number: this.state.number,
              oldBase: this.state.base,
              newBase: this.state.newBase
            }
          })
          .then((response) => {
            this.setState({
                result: response.data.Result
            });
          });
    }
    
    render() {
        return (
          <div className="Converter">
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
            <p>{this.state.result}</p>
          </div>
        );
      }
}

export default Converter;