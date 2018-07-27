import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import GetHelperName from '../../utils/URamos-BarUtils';
import IntegrationAutosuggest from '../Buscador';
import Login from '../Login'
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
                  <GetHelperName />
                </Typography>
                {/*<Chip avatar={<Avatar>MB</Avatar>} label="User Name" />*/}
                <Login />
              </ToolBar>
            </div>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}

export default UramosBar;
