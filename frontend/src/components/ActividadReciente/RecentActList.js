import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';

import RecentActs from './RecentActs';

class RecentActList extends Component {
  render() {
    return (
      <div className="list-div">
        <List>
          <Divider />
          <RecentActs class="danger" />
          <RecentActs class="warning" />
          <RecentActs class="default" />
          <RecentActs class="defualt" />
        </List>
      </div>
    );
  }
}

export default RecentActList;
