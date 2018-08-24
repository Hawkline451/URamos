import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import IntegrationAutosuggest from '../Buscador';
import Login from '../Login';
import './styles.css';
import RadioButtonGroup from '../RadioButtons';
import { connect } from 'react-redux';
import {
  AUTHSTATUS,
  JWTSTATUS,
  setAuthStatus,
  setJWTStatus,
  setNormalUser,
  setUser,
} from '../../actions';

class URamosBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { isModerator: false },
      normal_user: '',
      user_info: '',
      mod_info: '',
      search: 'codigo',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogged) {
      this.setState({
        user: nextProps.user,
        normal_user: nextProps.normalUser,
      });
      const infMod = (
        <Button color="inherit" href={'/moderar'}>
          Cursos a Moderar
        </Button>
      );
      const user = (
        <Button color="inherit" href={'/evaluacion'}>
          Evaluar
        </Button>
      );
      if (!nextProps.user.isLocked && !nextProps.user.isTeacher) {
        this.setState({ user_info: user });

        if (nextProps.user.isModerator) {
          this.setState({ mod_info: infMod });
        }
      }
    } else {
      this.setState({
        user: { isModerator: false },
        normal_user: '',
        user_info: '',
        mod_info: '',
      });
    }
  }

  componentWillMount() {
    if (this.props.isLogged) {
      this.setState({
        user: this.props.user,
        normal_user: this.this.props.normal_user,
      });
      const infMod = (
        <Button color="inherit" href={'/moderar'}>
          Cursos a Moderar
        </Button>
      );
      const user = (
        <Button color="inherit" href={'/evaluacion'}>
          Evaluar
        </Button>
      );
      if (!this.props.user.isLocked && !this.props.user.isTeacher) {
        this.setState({ user_info: user });

        if (this.props.user.isModerator) {
          this.setState({ mod_info: infMod });
        }
      }
    } else {
      if (localStorage.getItem('token') !== null) {
        this.setState({
          user: JSON.parse(localStorage.getItem('user')),
          normal_user: JSON.parse(localStorage.getItem('normal_user')),
        });

        this.props.set_jwt_status(JWTSTATUS.JWT_UPDATED);
        this.props.set_auth_status(AUTHSTATUS.LOGGED_IN);
        this.props.set_normal_user(
          JSON.parse(localStorage.getItem('normal_user')),
        );
        this.props.set_user(JSON.parse(localStorage.getItem('user')));
      } else {
        this.setState({
          user: { isModerator: false },
          normal_user: '',
          user_info: '',
          mod_info: '',
        });
      }
    }
  }

  changeSearchValue(searchValue) {
    this.setState({
      search: searchValue,
    });
  }

  render() {
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
              {this.state.user_info}
              {this.state.mod_info}
              <Button color="inherit" href={'/busqueda'}>
                Todos los cursos
              </Button>
            </div>
            <div className="search-frame">
              <div className="search-bar">
                <IntegrationAutosuggest search={this.state.search} />
              </div>
              <div
                style={{
                  display: 'inline-block',
                }}
              >
                <RadioButtonGroup
                  changeSearch={this.changeSearchValue.bind(this)}
                />
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
}

const mapStateToProps = state => {
  return {
    isLogged: state.authStatus === AUTHSTATUS.LOGGED_IN,
    JWTStatus: state.JWTStatus,
    user: state.user,
    normalUser: state.normalUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_jwt_status: stats => dispatch(setJWTStatus(stats)),
    set_auth_status: stats => dispatch(setAuthStatus(stats)),
    set_user: user => dispatch(setUser(user)),
    set_normal_user: normalUser => dispatch(setNormalUser(normalUser)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(URamosBar);
