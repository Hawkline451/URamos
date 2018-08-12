import React, {Component} from "react";
import Rate from "./Rate";
import TopTabs from "./TopTabs";
import SectionName from "./SectionName";
import CoursesList from "./CoursesList";
import CommentList from "./CommetList";
import axios from "axios";

class Curso extends Component {
  state = {
    code: null,
    name: null,
    cursos: [],
    notaCurso: null,
    votosCurso: 0,
    commentaries: [],
  };

  getinfo({ code }) {
    axios({
      method: 'post',
      url: 'http://142.93.4.35:3000/search/inforamo/',
      data: 'value=' + code,
      responseType: 'json',
    }).then(({ data }) => {
      const { code, name, cursos, notaCurso, votosCurso } = data;

      this.setState({
        code,
        name,
        cursos,
        notaCurso,
        votosCurso,
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
      </div>
    );
  }
}

export default Curso;
