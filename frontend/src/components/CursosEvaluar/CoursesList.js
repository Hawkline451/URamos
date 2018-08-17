import React from "react";
import {Redirect} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import axios from 'axios';
import data from '../../cursosTest1.json';

class CoursesList extends React.Component {
    render() {
        data.map(function (datita) {
            console.log(datita)
        });
        return <div></div>
    }
}

export default CoursesList
