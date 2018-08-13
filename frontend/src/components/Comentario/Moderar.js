import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class Moderar extends Component {
  state = {
    open: false,
    comentario: '',
    comentId: this.props.comentario,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTextChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = event => {
    console.log(this.state);
    if (localStorage.getItem('isLogged')) {
      console.log('autenticado');
      axios
        .post(
          'http://142.93.4.35:3000/comment/hide/',
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
          alert('El comentario ha sido ocultado con exito');
          window.location.reload();
        })
        .catch(() => {
          alert('Algo salio mal');
          window.location.reload();
        });
    }
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Button
          variant="contained"
          size="large"
          onClick={this.handleOpen}
          style={{
            backgroundColor: '#ffbb33',
            color: '#FF8800',
          }}
        >
          <SvgIcon style={{ color: 'black', marginRight: 10 }}>
            <path d="M 20 2 H 4 c -1.1 0 -1.99 0.9 -1.99 2 L 2 22 l 4 -4 h 14 c 1.1 0 2 -0.9 2 -2 V 4 c 0 -1.1 -0.9 -2 -2 -2 Z m -7 12 h -2 v -2 h 2 v 2 Z m 0 -4 h -2 V 6 h 2 v 4 Z" />
          </SvgIcon>
          <Typography variant="headline">
            <strong>Ocultar comentario</strong>
          </Typography>
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              width: 600,
              top: '30%',
              left: '35%',
              boxShadow: '5px 10px 10px 10px rgba(0, 0, 0, 0.3)',
              padding: 25,
            }}
          >
            <Typography
              variant="headline"
              style={{
                fontSize: 25,
              }}
            >
              <strong>Ocultar Comentario</strong>
            </Typography>
            <Divider />
            <Typography variant="headline" style={{ marginTop: 15 }}>
              ¿Seguro que quiere ocultar este comentario? <br />
              <br />
            </Typography>
            <Typography variant="headline">
              Usuario: <strong>{this.props.nickname}</strong>
            </Typography>
            <Typography variant="headline">
              Semestre: <strong>{this.props.curso}</strong>
            </Typography>
            <Typography
              variant="headline"
              style={{ textTransform: 'capitalize', marginBottom: 15 }}
            >
              Profesor: <strong>{this.props.profesor}</strong>
            </Typography>
            <Typography variant="headline" style={{ marginBottom: 15 }}>
              Comentario:{' '}
              <strong>"{this.props.content.substring(0, 50)} ..."</strong>
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="textarea"
                label="Motivo de la accion"
                placeholder="Motivo de la accion"
                helperText="Es necesario que escriba la razon de esta accion"
                multiline
                fullWidth
                onKeyUp={this.handleTextChange('comentario')}
                margin="normal"
                className={'comment-text'}
                inputProps={{
                  maxLength: 1024,
                }}
                style={{
                  marginBottom: 20,
                }}
              />
              <Divider />
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                style={{
                  marginTop: 30,
                  backgroundColor: '#ffbb33',
                  color: '#FF8800',
                }}
              >
                <SvgIcon style={{ color: 'black', marginRight: 10 }}>
                  <path d="M 20 2 H 4 c -1.1 0 -1.99 0.9 -1.99 2 L 2 22 l 4 -4 h 14 c 1.1 0 2 -0.9 2 -2 V 4 c 0 -1.1 -0.9 -2 -2 -2 Z m -7 12 h -2 v -2 h 2 v 2 Z m 0 -4 h -2 V 6 h 2 v 4 Z" />
                </SvgIcon>
                <Typography variant="headline">
                  <strong>Ocultar comentario</strong>
                </Typography>
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Moderar;
