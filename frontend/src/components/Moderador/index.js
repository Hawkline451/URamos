import React, {Component} from "react";
import {Route} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import CoursesList from "./CoursesList";

class Moderar extends Component {
    render() {
        return (
            <div>
                <CoursesList />
            </div>
        );
    }
}

export default Moderar;
