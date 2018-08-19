import React from "react";
import {Redirect} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";

class CoursesList extends React.Component {
    state = {
        change: false,
        load: false,
    };

    getInfo = () => {
        //142.93.4.35
        axios.post('http://localhost:3000/user/courses/', {}).then(({data}) => {
            console.log(data);
        });
    };

    componentWillMount() {
        this.getInfo();
    }

    render() {
        if(this.state.load){
            return <div>hola</div>
        } else {
            return <div>chao</div>
        }
    }
}

export default CoursesList
