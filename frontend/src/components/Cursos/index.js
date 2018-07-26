import React, { Component } from 'react';
import TopTabs from './TopTabs';
import SectionName from './SectionName';

class Curso extends Component {
  render() {
    return (
      <div>
        <TopTabs code='CC3201' />
        <SectionName code='CC3201' name='Bases de Datos' />
      </div>
    );
  }
}

export default Curso;
