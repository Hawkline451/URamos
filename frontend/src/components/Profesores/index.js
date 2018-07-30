import React, { Component } from 'react';
import Rate from './Rate';
import TopTabs from './TopTabs';
import SectionName from './SectionName';
import CoursesList from './CoursesList';
import axios from 'axios';

class Profesor extends Component {
  state = {
    name: null,
    cursos: [],
    nota: 0,
  };

  getinfo({ name }) {
    axios({
      method: 'post',
      url: 'http://localhost:3000/search/infoprofe/',
      data: 'value=' + name,
      responseType: 'json',
    }).then(({ data }) => {
      const { name, cursos, nota } = data;

      this.setState({
        name: name.toLowerCase(),
        cursos,
        nota,
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
        <Rate nota={this.state.nota} />
        <CoursesList cursos={this.state.cursos} />
      </div>
    );
  }
}

export default Profesor;
