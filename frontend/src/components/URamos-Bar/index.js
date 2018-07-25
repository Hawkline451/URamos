import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IntegrationAutosuggest from '../Buscador';
import './styles.css';

class UramosBar extends Component {
  render() {
    return (
      <div className="App-bar-custom">
        <AppBar position="static" color="default">
          <ToolBar className="main-toolbar">
            <Typography variant="title" color="inherit">
              <Link to="/">URamos</Link>
            </Typography>
            <div className="buttons">
              <Button color="inherit" href={'/evaluacion'}>
                Evaluar
              </Button>
              <Button color="inherit" href={'/busqueda'}>
                Todos los cursos
              </Button>
            </div>
            <div className="search-frame">
                <div className="search-bar">
                    <IntegrationAutosuggest />
                </div>
              <div className="search-button">
                <Button color="inherit" href={'/busqueda'} className="search">
                    Buscar
                </Button>
              </div>
            </div>
            <div className="right-user-div" align="right">
              <ToolBar>
                <Typography variant="title" color="inherit" align="right">
                  <Route
                    exact
                    path="/"
                    component={() => (
                      <div className="reference">
                        <span>Actividad Reciente</span>
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/busqueda"
                    component={() => (
                      <div className="reference">
                        <span>Busqueda</span>
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/curso"
                    component={() => (
                      <div className="reference">
                        <span>Curso</span>
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/profesor"
                    component={() => (
                      <div className="reference">
                        <span>Profesor</span>
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/evaluacion"
                    component={() => (
                      <div className="reference">
                        <span>Evaluacion</span>
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/evaluacion/formulario"
                    component={() => (
                      <div className="reference">
                        <span>Evaluacion</span>
                      </div>
                    )}
                  />
                </Typography>
                <Chip avatar={<Avatar>MB</Avatar>} label="User Name" />
              </ToolBar>
            </div>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}

export default UramosBar;
