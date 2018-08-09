import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import RecentActs from './RecentActs';

class RecentActList extends Component {
  render() {
    return (
      <div className="list-div">
        <List>
          <Divider />
          <RecentActs
            class="danger"
            text1="Ban 1-1-2018"
            text2="Se banneo al usuario Ardila por comentario en CC1000"
          />
          <RecentActs
            class="warning"
            text1="Bloqueo comentario 2-2-2018"
            text2="Se bloqueo un comentario en CC1001"
          />
          <RecentActs
            class="default"
            text1="Nuevo comentario 30-7-2018"
            text2="Usuario guau angelical 50 realizo un nuevo comentario en CC3102"
          />
          <RecentActs
            class="warning"
            text1="Bloqueo comentario 28-7-2018"
            text2="Se bloqueo un comentario en CC3102"
          />
        </List>
      </div>
    );
  }
}

export default RecentActList;
