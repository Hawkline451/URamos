import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

class SectionName extends Component {
  render() {
    return (
      <div className='sectionName-div'>
        <Typography
          align='left'
          variant='headline'
          paragraph={true}>
          Actividad Reciente
        </Typography>
      </div>
    );
  }
}

export default SectionName;