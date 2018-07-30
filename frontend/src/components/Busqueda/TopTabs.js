import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './styles.css';

class TopTabs extends Component {
  render() {
    return (
      <div className="tabs-div">
        <Typography align="left" variant="headline" paragraph={true}>
          U-Ramos
        </Typography>
        <Tabs
          fullWidth={true}
          value="recent-act"
          indicatorColor="primary"
          className="tabs"
        >
          <Tab
            value="recent-act"
            className="recent-act-tab"
            disableRipple
            label="Búsqueda"
          />
        </Tabs>
      </div>
    );
  }
}

export default TopTabs;
