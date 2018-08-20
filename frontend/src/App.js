import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import URamosBar from './components/URamos-Bar';
import ActividadReciente from './components/ActividadReciente';
import Busqueda from './components/Busqueda';
import Curso from './components/Cursos';
import Profesor from './components/Profesores';
import Evaluacion from './components/Evaluacion';
import Logout from './components/Login/logout';
import Login from './components/Login/login';
import Moderar from './components/Moderador';
import VerificarLogin from './routes/verificarLogin';
import VerificarModerator from './routes/verificarModerador';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <URamosBar/>

            <Route exact path="/" component={ActividadReciente} />
            <Route exact path="/busqueda" component={Busqueda} />
            <Route exact path="/cursos/:code" component={Curso} />
            <Route exact path="/profesor/:name" component={Profesor} />
            <Route exact path="/evaluacion" 
              component = {() => <VerificarLogin comp={Evaluacion} />} 
            />
            <Route exact path="/evaluacion/formulario"
              component={Evaluacion} />
            <Route path="/login/:jwt" component = {Login} />
            <Route exact path='/logout/' component={Logout} />
            <Route exact path="/moderar"
              component = {Moderar}
              />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
