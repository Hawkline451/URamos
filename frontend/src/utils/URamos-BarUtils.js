import React from 'react';
import { Route } from 'react-router-dom';

const GetHelperName = (props) => (
  <div>
    <Route
      exact
      path="/"
      component={() => (
        <div className="reference">
          <span>Actividad Reciente</span>
        </div>
      )}
    />
    <Route
      exact
      path="/busqueda"
      component={() => (
        <div className="reference">
          <span>Busqueda</span>
        </div>
      )}
    />
    <Route
      exact
      path="/curso"
      component={() => (
        <div className="reference">
          <span>Curso</span>
        </div>
      )}
    />
    <Route
      exact
      path="/profesor"
      component={() => (
        <div className="reference">
          <span>Profesor</span>
        </div>
      )}
    />
    <Route
      exact
      path="/evaluacion"
      component={() => (
        <div className="reference">
          <span>Evaluacion</span>
        </div>
      )}
    />
    <Route
      exact
      path="/evaluacion/formulario"
      component={() => (
        <div className="reference">
          <span>Evaluacion</span>
        </div>
      )}
    />
  </div>
);

export default GetHelperName;