import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './styles.css';

class TopTabs extends Component {
  render() {
    const { code } = this.props;

    return (
      <div className="tabs-curso-div">
        <Typography align="left" variant="headline" paragraph={true}>
          U-Ramos
        </Typography>
        <Tabs
          fullWidth={true}
          value="resumen eval"
          indicatorColor="primary"
          className="tabs-curso"
        >
          <Tab
            fullWidth
            value="resumen eval"
            className="resumen-eval-curso-tab"
            disableRipple
            label={'Resumen Evaluacion ' + code}
            style={{ width: 400, maxWidth: 400 }}
          />
        </Tabs>
      </div>
    );
  }
}

export default TopTabs;
