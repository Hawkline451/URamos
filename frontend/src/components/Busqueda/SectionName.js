import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class SectionName extends Component {
  render() {
    return (
      <div className="sectionName-div">
        <Typography align="left" variant="headline" paragraph={true}>
          Búsqueda de Cursos
        </Typography>
      </div>
    );
  }
}

export default SectionName;
