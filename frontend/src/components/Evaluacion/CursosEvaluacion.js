import React, {Component} from "react";
import "./styles.css";
import CoursesList from "../CursosEvaluar/CoursesList";
import IconReload from "../ButtonReload/index";

class CursosEvaluacion extends Component {
    render() {
        return (
            <div>
                <CoursesList />
            </div>
        );
    }
}

export default CursosEvaluacion;
