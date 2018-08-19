import React, {Component} from "react";
import TopTabs from "./TopTabs";
import SectionName from "./SectionName";
import CoursesList from "./CoursesList";
import axios from "axios";

class Moderar extends Component {
    constructor(props){
        super(props);
    }

    state = {
        code: null,
        name: null,
        cursos: [],
    };

    getinfo({code}) {
        axios({
            method: 'post',
            url: 'http://localhost:3000/moderator/',
            //data: 'value=' + code,
            responseType: 'json',
        }).then(({data}) => {
            console.log(data);
            /*
             this.setState({
             code,
             name,
             cursos,
             });
             */
        });
    }

    componentWillMount() {
        this.getinfo(this.props.match.params);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.code !== this.props.match.params.code) {
            this.getinfo(nextProps.match.params);
        }
    }

    render() {
        return (
            <div>
                <TopTabs code={this.state.code}/>
                <SectionName code={this.state.code} name={this.state.name}/>
                <CoursesList cursos={this.state.cursos}/>
            </div>
        );
    }
}

export default Moderar;
