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

  componentDidMount() {
    var havent_user = localStorage.getItem('user') === null;
    if(havent_user){
      fetch('http://142.93.4.35:3000/user/', {
        headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          localStorage.setItem('user', json);
        });
    }

    var havent_normal_user = localStorage.getItem('normal_user') === null;
    if(havent_normal_user){
      fetch('http://142.93.4.35:3000/auth/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        localStorage.setItem('normal_user',json);
      });
    }
  }


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
        localStorage.setItem('normal_user', json.user);
    });
    return <Redirect to='/'/>;
  };

  



  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <UramosBar/>

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
