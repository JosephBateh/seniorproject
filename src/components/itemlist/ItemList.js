import React, {Component} from 'react';
import ListItem from './ListItem';
import {List, ListItem as Item} from 'material-ui/List';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {}
    }

    onClick(value) {
        this.props.onClick(value);
    }

    componentWillUpdate(nextProps, nextState) {
        // Forces props to update if new props are available
        // Without if, it will exceed call stack ¯\_(ツ)_/¯
        if (nextProps.items !== this.state.items) {
            this.setState({
                items: nextProps.items
            });
        }
    }
    
    render() {
        const items = this.state.items;

        return (
            <div className="item-list">
                <List>
                    {items ? items.map((item, index) => <ListItem key={index} title={item.Title} artist={item.Artist} album={item.Album} id={item.ID} onClick={this.onClick}></ListItem>) : <Item>Loading...</Item>}
                </List>
            </div>
        );
    }
}

export default ItemList;