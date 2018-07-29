import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import UramosBar from './components/URamos-Bar';
import ActividadReciente from './components/ActividadReciente';
import Busqueda from './components/Buscador';
import Curso from './components/Cursos';
import Profesor from './components/Profesores';
import Evaluacion from './components/Evaluacion';
import Logout from './components/Login/logout';
import Login from './components/Login/login';
import './App.css';

class App extends Component {


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
            <Route path="/login/:rut" component = {Login} />
            <Route exact path='/logout/' component={Logout} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
