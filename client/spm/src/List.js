import React, {Component} from 'react';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "John",
            lastName: "Doe"
        };
    }
    
    render() {       
        var rows = [];
        var numrows = 100;
        for (var i = 0; i < numrows; i++) {
            rows.push(<div>{this.state.lastName}, {this.state.firstName}</div>);
        }
        
        return (
            <div className="list">
                {rows}
            </div>
        );
    }
}

export default List;