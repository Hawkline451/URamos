import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './styles.css';

class TopTabs extends Component {
  render() {
    const { name } = this.props;

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
            className="resumen-eval-tab"
            disableRipple
            label={'Resumen Evaluación ' + name}
            style={{
              textTransform: 'capitalize',
              width: 550,
              maxWidth: 550,
            }}
          />
        </Tabs>
      </div>
    );
  }
}

export default TopTabs;
