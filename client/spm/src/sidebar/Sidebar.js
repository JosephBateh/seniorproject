import React, {Component} from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem'
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';

class Sidebar extends Component {    
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var getURL = 'http://localhost:4000/';
        if (process.env.REACT_APP_ENV === 'production') {
            getURL = 'http://dev.josephbateh.com:4000';
        }
        axios({
            method: 'GET',
            baseURL: getURL,
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
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <List className="sidebar-flexlist">
                        {this.state.results ? this.state.results.map((result, index) => <SidebarItem key={index} title={result.Title} creator={result.Creator} ></SidebarItem>) : <ListItem>loading...</ListItem>}
                    </List>
                </div>
            </div>
        );
    }
}

export default Sidebar;