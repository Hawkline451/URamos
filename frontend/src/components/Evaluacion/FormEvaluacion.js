import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Form from './Form'

class FormEvaluacion extends Component {
  render() {
    return (
      <div>
        <Paper style={{
          backgroundColor: 'rgba(192, 192, 192, 0.8)',
          margin: '1% 22%',
          width: '55%',
          padding: '1%',
          float: 'left',
        }}>
          <Form />
        </Paper>
      </div>
    );
  }
}

export default FormEvaluacion;
