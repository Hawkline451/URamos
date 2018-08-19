import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import {Redirect} from "react-router-dom";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class CoursesList extends Component {
    state = {
        data: [],
        load: false,
        redirect: false,
    };

    getInfo = () => {
        //142.93.4.35
        axios.post('http://localhost:3000/user/courses/', {}).then(({data}) => {
            const new_Data = data.map(course => {
                console.log(course);
                let evaluate = '';
                if(course.isEvaluate === false){
                    evaluate = 'Por Evaluar'
                } else {
                    evaluate = 'Evaluado'
                }
                return {
                    'curso': course.course__subject__code + ' - ' + course.course__subject__name,
                    'estado': evaluate,
                    'year': course.course__semester__year,
                    'periodo': course.course__semester__name
                }
            });
            this.setState({
                data: new_Data.sort(
                    (a,b) => (a.year > b.year ? -1 : 1),
                ),
            })
        });
    };

    componentWillMount() {
        this.getInfo();
    }

    handleClick = () => {
        /* this.setState({
         link: '/profesor/' + teacher,
         redirect: true,
         });
         */
        console.log('click')
    };

    render() {
        const {classes} = this.props;
        const {data} = this.state;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Semestre</TableCell>
                            <TableCell>Curso</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => {
                            const semester = item.year + ' ' + item.periodo;
                            const course = item.curso;
                            return (
                                <TableRow hover key={semester + ' ' + course}>
                                    <TableCell>
                                        {semester}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.curso}
                                    </TableCell>
                                    <TableCell
                                        onClick={event => this.handleClick()}
                                    >
                                        {item.estado}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

CoursesList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CoursesList);