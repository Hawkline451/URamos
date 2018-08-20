import React, { Component } from 'react';
import Rate from './Rate';
import TopTabs from './TopTabs';
import SectionName from './SectionName';
import CoursesList from './CoursesList';
import Graph from '../GraficosProfe/index'
import axios from 'axios';

class Profesor extends Component {
  state = {
    name: null,
    realName: null,
    cursos: [],
    nota: 0,
  };

  getinfo({ name }) {
    axios({
      method: 'post',
      url: 'http://142.93.4.35:3000/search/infoprofe/',
      data: 'value=' + name,
      responseType: 'json',
    }).then(({ data }) => {
      const { name, cursos, nota, votosProfesor } = data;

      this.setState({
        name: name.toLowerCase(),
        realName: name,
        cursos,
        nota,
        votosProfesor,
      });
    });
  }

  componentWillMount() {
    this.getinfo(this.props.match.params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.name !== this.props.match.params.name) {
      this.getinfo(nextProps.match.params);
    }
  }

  render() {
    return (
      <div>
        <TopTabs name={this.state.name} />
        <SectionName name={this.state.name} />
        <Rate nota={this.state.nota} votos={this.state.votosProfesor} />
        <CoursesList cursos={this.state.cursos} />
        <Graph name={this.state.realName}/>
      </div>
    );
  }
}

export default Profesor;
