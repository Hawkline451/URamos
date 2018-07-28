import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import UramosBar from './components/URamos-Bar';
import ActividadReciente from './components/ActividadReciente';
import Busqueda from './components/Buscador';
import Curso from './components/Cursos';
import Profesor from './components/Profesores';
import Evaluacion from './components/Evaluacion';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    logged_in: localStorage.getItem('token') ? true : false,
    user: ''
  };  
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://http://142.93.4.35:3000/user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        this.setState({ user: json});
      });
    }
  }

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  }; 

  handle_login = (props) => {
    fetch('http://142.93.4.35:3000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username" : props.match.params.rut.toString(),
        "password" : props.match.params.rut.toString()
      })
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
      });
    });

    fetch('http://142.93.4.35:3000/user/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
          .then(res => res.json())
          .then(json => {
            this.setState({ user: json})
          });

    console.log(this.state.user)
    return <Redirect to='/'/>;
  };   


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <UramosBar 
              logged_in={this.state.logged_in}
              handle_logout={this.handle_logout}
            />

            <Route exact path="/" component={ActividadReciente} />
            <Route exact path="/busqueda" component={Busqueda} />
            <Route exact path="/curso" component={Curso} />
            <Route exact path="/profesor" component={Profesor} />
            <Route exact path="/evaluacion" component={Evaluacion} />
            <Route exact path="/evaluacion/formulario"
              component={Evaluacion} />
            <Route path="/login/:rut" component = {this.handle_login} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
