import React, {Component} from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem'
import axios from 'axios';

class Sidebar extends Component {    
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios({
            method: 'GET',
            baseURL: 'http://localhost:4000/',
            url: '/playlists'
          })
          .then((response) => {
            var responseString = JSON.stringify(response.data);
            var responseObject = JSON.parse(responseString);
            this.setState({
                results: responseObject
            });
          })
          .catch(function(err) {
              console.log(err);
          });
    }
    
    render() {
        return (
            <div className="sidebar">
                <div className="playlists">
                    <ul>
                        {this.state.results ? this.state.results.map((result, index) => <SidebarItem key={index} title={result.Title} creator={result.Creator} ></SidebarItem>) : <li>loading...</li>}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;