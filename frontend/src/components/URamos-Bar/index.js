import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GetHelperName from '../../utils/URamos-BarUtils';
import IntegrationAutosuggest from '../Buscador';
import Login from '../Login'
import './styles.css';

class UramosBar extends Component {

  constructor(props){
    super(props);
      this.state = { 
        user: JSON.parse(localStorage.getItem('user')),
        normal_user: JSON.parse(localStorage.getItem('normal_user')),
        user_info: '',
        mod_info: ''
      };
  }

  componentDidMount(){
    if(localStorage.getItem('isLogged') === 'true'){
      fetch('http://142.93.4.35:3000/auth/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
            localStorage.setItem('normal_user', JSON.stringify(json));

          this.setState({normal_user:json});
      });

      this.setState({user: JSON.parse(localStorage.getItem('user')),
            normal_user: JSON.parse(localStorage.getItem('normal_user')),
      });

      const infMod = (<Button color="inherit" href={'/moderar'}>
                    Cursos a Moderar
                    </Button>
                  );
      const user = (<Button color="inherit" href={'/evaluacion'}>
                        Evaluar
                      </Button>
                    );
      this.setState({user_info:user})
      if(this.state.user.isModerator){
        this.setState({mod_info:infMod})
      }

    }
   
    
  }


  render() {
    return (
      <div className="App-bar-custom">
        <AppBar position="static" color="default">
          <ToolBar className="main-toolbar">
            <Typography variant="title" color="inherit">
              <Link to="/">URamos</Link>
            </Typography>
            <div className="buttons">
              {this.state.user_info}
              {this.state.mod_info}
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
                <Typography variant="title" color="inherit" align="right">
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
}

export default UramosBar;
