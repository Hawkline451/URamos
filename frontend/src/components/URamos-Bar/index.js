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
        <AppBar position="static">
          <ToolBar>
            <Typography variant="title" color="inherit">
              <Link to="/">URamos</Link>
            </Typography>
            <Button color="inherit">
              <Link to="/evaluacion">Evaluar</Link>
            </Button>
            <Button color="inherit">
              <Link to="/busqueda">Todos los cursos</Link>
            </Button>
            <div className="search-button">
              <TextField id="search" placeholder="Buscar" margin="normal" />
              <Button color="inherit">
                <Link to="/busqueda">Buscar</Link>
              </Button>
            </div>
            <div className="right-user-div" align="right">
              <ToolBar>
                <Typography variant="title" color="inherit" align="right">
                  <Route
                    exact
                    path="/"
                    component={() => <div>Actividad Reciente</div>}
                  />
                  <Route
                    exact
                    path="/busqueda"
                    component={() => <div>Busqueda</div>}
                  />
                  <Route
                    exact
                    path="/curso"
                    component={() => <div>Curso</div>}
                  />
                  <Route
                    exact
                    path="/profesor"
                    component={() => <div>Profesor</div>}
                  />
                  <Route
                    exact
                    path="/evaluacion"
                    component={() => <div>Evaluacion</div>}
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
