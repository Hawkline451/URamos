import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './styles.css';
import CoursesList from "../CursosEvaluar/CoursesList";

class CursosEvaluacion extends Component {
  render() {
    return (
      <div className='cursosToEval-div'>
        /*<Button variant="outlined" href="/evaluacion/formulario" size='large' style={{
          fontSize: 16
        }}>
          Formulario
        </Button>
        */
        <CoursesList />
      </div>
    );
  }
}

export default CursosEvaluacion;
