import React, { Component } from 'react';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';

class RecentActs extends Component {
  render() {
    return (
      <div>
        <ListItem divider>
          <ListItemText
            className={this.props.class}
            primary="List item text 3"
            secondary="List item text 3 secondary"
          />
        </ListItem>
      </div>
    );
  }
}

export default RecentActs;
