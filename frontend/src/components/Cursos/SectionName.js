import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class SectionName extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { code, name } = this.props;

    return (
      <div className="sectionName-div">
        <Typography align="left" variant="headline" paragraph={true}>
          {code} - {name}
        </Typography>
      </div>
    );
  }
}

export default SectionName;
