import React, {Component} from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem'

class Sidebar extends Component {    
    render() {
        return (
            <div className="sidebar">
                <div className="playlists">
                    <label>
                        Playlists
                    </label>
                    <ul>
                        <SidebarItem title="Top 10"></SidebarItem>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;