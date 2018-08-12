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


class UramosBarC extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: JSON.parse(localStorage.getItem('user')),
      normal_user: JSON.parse(localStorage.getItem('normal_user')),
      user_info: '',
      mod_info: ''
    };
  }

  componentDidMount(){
    console.log(this.props.authStatus);
    var isLoggedIn = this.props.isLogged;
    if(localStorage.getItem('user')){
      isLoggedIn = true;
    }
    if(isLoggedIn){
      console.log("holipiii");
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
}

const mapStateToProps = (state) =>{
  console.log("12345555");
  return{
    isLogged: state.authStatus === AUTHSTATUS.LOGGED_IN,
    authStatus: state.authStatus
  };
}

export default connect(mapStateToProps)(UramosBarC);
