import React, {Component} from "react";
import "./styles.css";
import CoursesList from "../CursosEvaluar/CoursesList";
import IconReload from "../ButtonReload/index";

class CursosEvaluacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
        };
    }

    changeLoadValue(loadValue) {
        this.setState({
            load: loadValue
        });
    }

    render() {
        return (
            <div>
                <IconReload changeLoad={this.changeLoadValue.bind(this)}/>
                <CoursesList load={this.state.load}/>
            </div>
        );
    }
}

export default CursosEvaluacion;
