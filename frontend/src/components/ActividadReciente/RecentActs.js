import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class RecentActs extends Component {
  render() {
    return (
      <div>
        <ListItem divider>
          <ListItemText
            style={{
              primary: {
                fontSize: 20,
              },
            }}
            className={this.props.class}
            primary={this.props.text1}
            secondary={this.props.text2}
          />
        </ListItem>
      </div>
    );
  }
}

export default RecentActs;
