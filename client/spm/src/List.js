import React, {Component} from 'react';
import './List.css';
import axios from 'axios';
import ListItem from './ListItem';

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
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Artist</td>
                            <td>Album</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.results ? this.state.results.map((result, index) => <ListItem key={index} title={result.Title} artist={result.Artist} album={result.Album}></ListItem>) : <tr><td>loading...</td></tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;