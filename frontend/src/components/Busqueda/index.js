import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var FilteredList = React.createClass({
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
<List items={this.state.items}/>
      )}
        </fieldset>
        </form>
      </div>
    );
  }
});

var List = React.createClass({
  render: function(){
    return (
      <ul className="list-group">
      {
        this.props.items.map(function(item) {
          return <li className="list-group-item" data-category={item} key={item}>{item}</li>
        })
       }
      </ul>
    )
  }
});

React.render(<FilteredList/>, document.getElementById('app'));