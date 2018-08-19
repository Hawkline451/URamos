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
        dataEvaluate: [],
        dataNotEvaluate: [],
        redirect: false,
        link: '',
    };

    getInfo = (loadValue) => {
        //142.93.4.35
        axios.post('http://localhost:3000/user/courses/', {
            load: loadValue
        }).then(({data}) => {
            const {evaluate, notEvaluate} = data;
            const dataEvaluate = evaluate.map(course => {
                return {
                    'curso': course.course__subject__code + ' - ' + course.course__subject__name,
                    'estado': course.isEvaluate,
                    'year': course.course__semester__year,
                    'periodo': course.course__semester__name,
                    'teacher': course.course__teacher__name
                }
            });
            const dataNotEvaluate = notEvaluate.map(course => {
                return {
                    'curso': course.course__subject__code + ' - ' + course.course__subject__name,
                    'estado': course.isEvaluate,
                    'year': course.course__semester__year,
                    'periodo': course.course__semester__name,
                    'teacher': course.course__teacher__name
                }
            });
            this.setState({
                dataEvaluate: dataEvaluate.sort(
                    (a, b) => (a.year > b.year ? -1 : 1),
                ),
                dataNotEvaluate: dataNotEvaluate.sort(
                    (a, b) => (a.year > b.year ? -1 : 1),
                ),
            })
        });
    };

    componentWillMount() {
        this.getInfo(false);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.load !== this.props.load) {
            this.getInfo(true)
        }
    }

    handleClick = () => {
        /* this.setState({
         link: '/profesor/' + teacher,
         redirect: true,
         });
         */
        console.log('click')
    };

    createTableCoursesEvaluate = () => {
        const {classes} = this.props;
        const {dataEvaluate} = this.state;
        if (this.state.dataEvaluate.length !== 0) {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell> Semestre </TableCell>
                                <TableCell> Curso </TableCell>
                                <TableCell> Profesor </TableCell>
                                <TableCell> Estado </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataEvaluate.map(item => {
                                const semester = item.year + ' ' + item.periodo;
                                const course = item.curso;
                                const teacher = item.teacher;
                                return (
                                    <TableRow key={semester + ' ' + course + ' ' + teacher}>
                                        <TableCell>
                                            {semester}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.curso}
                                        </TableCell>
                                        <TableCell>
                                            {item.teacher}
                                        </TableCell>
                                        <TableCell>
                                            {item.estado}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            )
        } else {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell/>
                                <TableCell>No hay cursos evaluados</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            )
        }
    };

    createTableCoursesNotEvaluate = () => {
        const {classes} = this.props;
        const {dataNotEvaluate} = this.state;
        if (this.state.dataNotEvaluate.length !== 0) {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Semestre</TableCell>
                                <TableCell>Curso</TableCell>
                                <TableCell> Profesor </TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataNotEvaluate.map(item => {
                                const semester = item.year + ' ' + item.periodo;
                                const course = item.curso;
                                const teacher = item.teacher;
                                return (
                                    <TableRow hover key={semester + ' ' + course + ' ' + teacher}>
                                        <TableCell>
                                            {semester}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.curso}
                                        </TableCell>
                                        <TableCell>
                                            {item.teacher}
                                        </TableCell>
                                        <TableCell
                                            onClick={event => this.handleClick()}
                                            className={'cursos'}
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {item.estado}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            )
        } else {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell/>
                                <TableCell>No hay cursos por evaluar</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            )
        }
    };


    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to={this.state.link}/>;
        } else {
            return (
                <div>
                    <h1>Cursos por Evaluar</h1>
                    {this.createTableCoursesNotEvaluate()}
                    <h1>Cursos Evaluados</h1>
                    {this.createTableCoursesEvaluate()}
                </div>
            );
        }
    }
}

CoursesList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CoursesList);