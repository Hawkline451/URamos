import React, {Component} from "react";
import {Route} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import CursosEvaluacion from "./CursosEvaluacion";
import FormEvaluacion from "./FormEvaluacion";

class Evaluacion extends Component {
    render() {
        return (
            <div>
                <Paper elevation={0} square={true}>
                    <Route exact path="/evaluacion" component={CursosEvaluacion}/>
                </Paper>
            </div>
        );
    }
}

export default Evaluacion;
