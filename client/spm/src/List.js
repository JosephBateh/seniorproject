import React, {Component} from 'react';
import './List.css';
import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios({
            method: 'GET',
            baseURL: 'http://localhost:4000/',
            url: '/dummydata'
          })
          .then((response) => {
            var responseString = JSON.stringify(response.data);
            var responseObject = JSON.parse(responseString);
            this.setState({
                results: responseObject
            });
            console.log(JSON.stringify(response.data))
          })
          .catch(function(err) {
              console.log(err);
          });
    }
    
    render() {
        return (
            <div className="list">
                 {this.state.results ? this.state.results.map((result, index) => <div key={index}>{result.Title}, {result.Artist}, {result.Album}</div>) : <div>loading...</div>}
            </div>
        );
    }
}

export default List;