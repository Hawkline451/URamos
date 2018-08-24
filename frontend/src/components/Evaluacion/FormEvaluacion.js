import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Form from "./Form";

class FormEvaluacion extends Component {
    render() {
        const {code, teacher, anno, semester, name, section} = this.props;
        return (
            <div>
                <Paper style={{
                    backgroundColor: 'rgba(192, 192, 192, 0.8)',
                    margin: '1% 14%',
                    width: '73%',
                    padding: '1%',
                    float: 'left',
                }}>
                    <Form code={code} teacher={teacher} anno={anno} semester={semester} name={name} section={section}/>
                </Paper>
            </div>
        );
    }
}

export default FormEvaluacion;
