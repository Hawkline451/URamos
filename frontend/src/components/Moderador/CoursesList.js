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
import {Link, Redirect, Route} from "react-router-dom";
import './styles.css'

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
        dataModerate: [],
        redirect: false,
        link: '',
        deparment: '',
        code: '',
        name: '',
    };

    getInfo = () => {
        //142.93.4.35
        axios.post('http://142.93.4.35:3000/moderator/courses/', {},
            {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                },
            }
        ).then(({data}) => {
            const dataModerate = data.map(course => {
                return {
                    'code': course.subject__code,
                    'name': course.subject__name,
                    'department': course.subject__department
                }
            });
            this.setState({
                dataModerate: dataModerate.sort(
                    (a, b) => (a.code > b.code ? -1 : 1),
                )
            })
        });
    };

    componentWillMount() {
        this.getInfo(false);
    }

    handleClick = (code) => {
        this.setState({
            link: "/cursos/" + code,
            redirect: true,
        })
    };

    createTableCoursesModerate = () => {
        const {classes} = this.props;
        const {dataModerate} = this.state;
        if (dataModerate.length !== 0) {
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Departamento</TableCell>
                                <TableCell>Curso</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataModerate.map(item => {
                                const course = item.code + ' - ' + item.name;
                                const department = item.department;
                                return (
                                    <TableRow hover key={course}>
                                        <TableCell>
                                            {department}
                                        </TableCell>
                                        <TableCell
                                            onClick={event => this.handleClick(item.code)}
                                            className={'cursos'}
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {course}
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
                                <TableCell>No hay cursos para Moderar</TableCell>
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
            const link = this.state.link;
            return <Redirect to={ link }/>;
            ;
        } else {
            return (
                <div>
                    <h1>Cursos a Moderar</h1>
                    {this.createTableCoursesModerate()}
                </div>
            );
        }
    }
}

CoursesList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CoursesList);