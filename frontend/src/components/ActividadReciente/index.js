import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TopTabs from './TopTabs';
import RecentActList from './RecentActList';
import SectionName from './SectionName';

class ActividadReciente extends Component {
  render() {
    return (
      <div>
        <Paper elevation={0} square={true}>
          <TopTabs />
          <SectionName />
          <RecentActList />
        </Paper>
      </div>
    );
  }
}

export default ActividadReciente;
