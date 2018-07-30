import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class SectionName extends Component {
  render() {
    const { name } = this.props;

    return (
      <div className="sectionName-prof-div">
        <Typography
          align="left"
          variant="headline"
          paragraph={true}
          style={{
            textTransform: 'capitalize',
            margin: '1% 4%',
            fontSize: 45,
            color: 'rgba(58, 55, 55, 0.8)',
          }}
        >
          {name}
        </Typography>
      </div>
    );
  }
}

export default SectionName;
