/**
 * Created by Android on 23-07-2018.
 */

import React, { Component } from 'react';
//import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
//import 'react-select/dist/react-select.css';

var createReactClass = require('create-react-class');

var Busqueda = createReactClass({
  filterList: function(event){
    /*Ale, aca haz el GET  a la API*/
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      console.log(event.target.value.toLowerCase());
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  showSuggestions: function(){
    this.setState({show: true})
  },
  hideSuggestions: function(){
    this.setState({show: false})
  },
  getInitialState: function(){
     return {
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Hash Browns"
       ],
       items: [],
       show: false
     }
  },
  componentWillMount: function(){
    this.setState({items: this.state.initialItems})
  },
  render: function(){
    return (
      <div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList} onFocus={this.showSuggestions} onBlur={this.hideSuggestions}/>
          {this.state.show && (
<List1 items={this.state.items}/>
      )}
        </fieldset>
        </form>
      </div>
    );
  }
});

var List1 = createReactClass({
  render: function(){
    return (
      <List component="nav">
          {
              this.props.items.map(function (item) {
                  return (
                      <ListItem button>
                          <ListItemText primary={item}/>
                      </ListItem>
                  )
              })
          }
      </List>
    )
  }
});

export default Busqueda;