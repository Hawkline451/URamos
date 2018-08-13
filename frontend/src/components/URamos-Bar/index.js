import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GetHelperName from '../../utils/URamos-BarUtils';
import IntegrationAutosuggest from '../Buscador';
import Login from '../Login';
import './styles.css';
import { connect } from 'react-redux'
import { AUTHSTATUS } from '../../actions';

function UramosBar(props){
  var user = {'isModerator':false}
  var user_info = '';
  var mod_info = '';
  
  console.log(props.isLogged);
  console.log( JSON.parse(localStorage.getItem('user')));
  
  if(props.isLogged){
    if(user.isModerator){
      mod_info  = (<Button color="inherit" href={'/moderar'}>
                      Cursos a Moderar
                      </Button>
                    );
    }
    if(user){
      user_info = (<Button color="inherit" href={'/evaluacion'}>
                          Evaluar
                        </Button>
                      );
    }
  }
  

   return (
      <div className="App-bar-custom">
        <AppBar position="static" color="default">
          <ToolBar className="main-toolbar">
            <Typography
              variant="title"
              color="inherit"
              style={{
                fontSize: 26,
              }}
            >
              <Link to="/">URamos</Link>
            </Typography>
            <div className="buttons">
              {user_info}
              {mod_info}
              <Button color="inherit" href={'/busqueda'}>
                Todos los cursos
              </Button>
            </div>
            <div className="search-frame">
                <div className="search-bar">
                    <IntegrationAutosuggest />
                </div>
            </div>
            <div className="right-user-div" align="right">
              <ToolBar>
                <Typography
                  variant="title"
                  color="inherit"
                  align="right"
                  style={{
                    fontSize: 26,
                  }}
                >
                  <GetHelperName />
                </Typography>
                <Login />
              </ToolBar>
            </div>
          </ToolBar>
        </AppBar>
      </div>
    );  
}


const mapStateToProps = (state) =>{
  return{
    isLogged: state.authStatus === AUTHSTATUS.LOGGED_IN,
  };
}

export default connect(mapStateToProps)(UramosBar);
