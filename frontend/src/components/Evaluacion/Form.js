import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Ratings from 'react-ratings-declarative';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import URL_BACKEND from '../../routes/Host'


import './styles.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notaValoracion: 0,
      notaExigencia: 0,
      notaBuenDocente: 0,
      notaCompromiso: 0,
      notaAsistencia: 0,
      comentario: '',
      code: '',
      teacher: '',
      anno: 0,
      semester: '',
      section: 1,
      name: '',
    };
  }

  changeRatingValoracion = newRating => {
    this.setState({
      notaValoracion: newRating,
    });
  };

  changeRatingExigencia = newRating => {
    this.setState({
      notaExigencia: newRating,
    });
  };

  changeRatingCompromiso = newRating => {
    this.setState({
      notaCompromiso: newRating,
    });
  };

  changeRatingBuenDocente = newRating => {
    this.setState({
      notaBuenDocente: newRating,
    });
  };

  changeRatingAsistencia = newRating => {
    this.setState({
      notaAsistencia: newRating,
    });
  };

  handleTextChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = event => {
    if (
      this.state.notaAsistencia === 0 ||
      this.state.notaBuenDocente === 0 ||
      this.state.notaCompromiso === 0 ||
      this.state.notaExigencia === 0 ||
      this.state.notaValoracion === 0
    ) {
      alert('No se han completado todos los campos obligatorios');
    } else {
      axios
        .post(
          URL_BACKEND+'/comment/save/',
          {
            data: this.state,
          },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
            },
          },
        )
        .then(({ data }) => {
          alert('Su evaluacion ha sido procesada con exito \n\n Gracias!');
          window.location = '/evaluacion/';
        })
        .catch(() => {
          alert('Algo salio mal');
          window.location = '/evaluacion/';
        });
    }
    event.preventDefault();
  };

  componentWillMount() {
    const { code, teacher, anno, semester, name, section } = this.props;
    this.setState({
      code: code,
      teacher: teacher,
      anno: anno,
      semester: semester,
      section: section,
      name: name,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>
            Curso: {this.state.code} - {this.state.name} - {this.state.semester}
            . Profesor: {this.state.teacher}{' '}
          </h4>
          <Paper
            style={{
              width: '48.7%',
              display: 'inline-block',
              float: 'left',
              marginBottom: '2%',
              padding: '10px',
            }}
          >
            <Typography
              align="left"
              color="primary"
              className={'required'}
              variant="headline"
              paragraph={true}
              style={{
                fontSize: 25,
              }}
            >
              Valoración del ramo
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              variant="subheading"
              paragraph={true}
              style={{
                marginBottom: '9.6%',
                fontSize: 16,
              }}
            >
              ¿El ramo es interesante? <br />
              ¿Aporta en mi formación para el plan que estoy cursando?
              <br />
              <br />
              1: El ramo no aporta/no es interesante <br />
              7: El ramo aporta/es interesante
            </Typography>
            <Ratings
              className={'container-putnos'}
              typeOfWidget="Punto"
              rating={this.state.notaValoracion}
              changeRating={this.changeRatingValoracion}
              widgetHoverColors="rgb(135,170,250)"
              widgetRatedColors="rgb(135,170,250)"
              svgIconPaths="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <Typography
              align="left"
              color="primary"
              className={'required'}
              variant="headline"
              paragraph={true}
              style={{
                fontSize: 25,
              }}
            >
              Exigencia del ramo
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              variant="subheading"
              paragraph={true}
              style={{
                marginBottom: '10%',
                fontSize: 16,
              }}
            >
              ¿Crees que la exigencia del ramo es acorde a la cantidad de
              créditos asignados? <br />
              <br />
              1: El ramo no es exigente <br />
              7: El ramo es muy exigente
            </Typography>
            <Ratings
              typeOfWidget="Punto"
              rating={this.state.notaExigencia}
              changeRating={this.changeRatingExigencia}
              widgetHoverColors="rgb(135,170,250)"
              widgetRatedColors="rgb(135,170,250)"
              svgIconPaths="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
            <br />
          </Paper>
          <Paper
            style={{
              width: '48.7%',
              display: 'inline-block',
              float: 'right',
              marginBottom: '2%',
              marginRight: '0.7%',
              padding: '10px',
            }}
          >
            <Typography
              align="left"
              color="primary"
              className={'required'}
              variant="headline"
              paragraph={true}
              style={{
                fontSize: 25,
              }}
            >
              Compromiso del profesor
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              variant="subheading"
              paragraph={true}
              style={{
                marginBottom: '10%',
                fontSize: 16,
              }}
            >
              ¿El profesor considera el feedback de los alumnos? <br />
              ¿El docente responde dudas e inquietudes de sus
              alumnos?
              <br />
              <br />
              1: El profesor no realiza bien su labor <br />
              7: El profesor es comprometido con el curso
            </Typography>
            <Ratings
              typeOfWidget="Punto"
              rating={this.state.notaCompromiso}
              changeRating={this.changeRatingCompromiso}
              widgetHoverColors="rgb(135,170,250)"
              widgetRatedColors="rgb(135,170,250)"
              svgIconPaths="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <Typography
              align="left"
              color="primary"
              className={'required'}
              variant="headline"
              paragraph={true}
              style={{
                fontSize: 25,
              }}
            >
              Qué tan bien enseña el Docente
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              variant="subheading"
              paragraph={true}
              style={{
                marginBottom: '10%',
                fontSize: 16,
              }}
            >
              ¿Explica de forma comprensible los conceptos de la clase? <br />
              ¿Se interesa porque los alumnos aprendan?
              <br />
              <br />
              1: No enseña bien <br />
              7: Enseña muy bien
            </Typography>
            <Ratings
              typeOfWidget="Punto"
              rating={this.state.notaBuenDocente}
              changeRating={this.changeRatingBuenDocente}
              widgetHoverColors="rgb(135,170,250)"
              widgetRatedColors="rgb(135,170,250)"
              svgIconPaths="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
          </Paper>
          <Paper
            style={{
              float: 'left',
              display: 'block',
              width: '99.5%',
              padding: '10px',
            }}
          >
            <Typography
              align="left"
              color="primary"
              className={'required'}
              variant="headline"
              paragraph={true}
              style={{
                fontSize: 25,
              }}
            >
              Importancia de asistir a clases
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              variant="subheading"
              paragraph={true}
              style={{
                marginBottom: '4%',
                fontSize: 16,
              }}
            >
              ¿Qué tan importante es asistir a clases en este ramo?
              <br />
              <br />
              1: No es importante <br />
              7: Es muy importante
            </Typography>
            <Ratings
              typeOfWidget="Punto"
              rating={this.state.notaAsistencia}
              changeRating={this.changeRatingAsistencia}
              widgetHoverColors="rgb(135,170,250)"
              widgetRatedColors="rgb(135,170,250)"
              svgIconPaths="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <Typography
              align="left"
              color="primary"
              variant="headline"
              paragraph={true}
              style={{
                fontSize: 25,
              }}
            >
              Comentario
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              variant="subheading"
              paragraph={true}
              style={{
                marginBottom: '0.5%',
                fontSize: 16,
              }}
            >
              Por favor deja un comentario sobre el ramo, para que los demás
              tengan información de él. <br />
              El comentario será totalmente anónimo, pero evita lenguaje vulgar
              en insultos en tu respuesta.
            </Typography>
            <TextField
              id="multiline-flexible"
              label="Comentario (opcional)"
              helperText="Recuerda no ser ofensivo"
              multiline
              fullWidth
              margin="normal"
              onKeyUp={this.handleTextChange('comentario')}
              className={'comment-text'}
              inputProps={{
                maxLength: 1024,
              }}
            />
          </Paper>
          <Button
            color="primary"
            fullWidth
            type="submit"
            variant="raised"
            style={{
              backgroundColor: 'rgb(92,184,92)',
              marginTop: '2%',
              padding: '15px 0',
              color: 'white',
              fontSize: '30px',
              letterSpacing: 4,
            }}
          >
            Enviar Evaluación
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
