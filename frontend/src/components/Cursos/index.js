import React, { Component } from 'react';
import Rate from './Rate';
import TopTabs from './TopTabs';
import SectionName from './SectionName';
import CoursesList from './CoursesList';
import Comentario from '../Comentario';
import Graph from '../GraficosCursos/index'
import axios from 'axios';
import URL_BACKEND from '../../routes/Host'


class Curso extends Component {
  state = {
    code: null,
    name: null,
    cursos: [],
    notaCurso: null,
    votosCurso: 0,
    comentarios: [],
  };

  getinfo({ code }) {
    let name = ''
    if (localStorage.getItem('user')) {
      name = localStorage.getItem('user').split(':')[1].split(',')[0].split('"')[1]
    } 

    axios.post(URL_BACKEND+'/search/inforamo/', {
      value : code,
      user : name
    }).then(({ data }) => {
      const { code, name, cursos, notaCurso, votosCurso, comentarios } = data;

      this.setState({
        code,
        name,
        cursos,
        notaCurso,
        votosCurso,
        comentarios,
      });
    });

    
  }


    componentWillMount() {
        this.getinfo(this.props.match.params);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.code !== this.props.match.params.code) {
            this.getinfo(nextProps.match.params);
        }
    }

  render() {
    return (
      <div>
        <TopTabs code={this.state.code} />
        <SectionName code={this.state.code} name={this.state.name} />
        <Rate nota={this.state.notaCurso} votos={this.state.votosCurso} />
        <CoursesList cursos={this.state.cursos} />
        <Graph code={this.state.code}/>
        <Comentario comentarios={this.state.comentarios} {...this.props} />
      </div>
    );
  }
}

export default Curso;
