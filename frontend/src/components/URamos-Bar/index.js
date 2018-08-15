import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
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
          <ToolBar
            className="main-toolbar"
            style={{
              paddingLeft: 0,
            }}
          >
            <Button color="inherit" href={'/'}>
              <SvgIcon
                style={{
                  fontSize: 40,
                  color: 'white',
                }}
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </SvgIcon>
            </Button>
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
