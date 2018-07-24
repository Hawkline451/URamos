import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
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
              <Button color="inherit">
                <Link to="/evaluacion">Evaluar</Link>
              </Button>
              <Button color="inherit">
                <Link to="/busqueda">Todos los cursos</Link>
              </Button>
            </div>
            <div className="search-frame">
              <TextField id="search" placeholder="Buscar" margin="normal" />
              <div className="search-button">
                <Button color="inherit">
                  <Link to="/busqueda" className="search">
                    Buscar
                  </Link>
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
