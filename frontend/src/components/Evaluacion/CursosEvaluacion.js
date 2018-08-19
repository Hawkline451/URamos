import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './styles.css';
import CoursesList from "../CursosEvaluar/CoursesList2";

class CursosEvaluacion extends Component {
  render() {
    return (
      <div className='cursosToEval-div'>
        <CoursesList />
      </div>
    );
  }
}

export default CursosEvaluacion;
