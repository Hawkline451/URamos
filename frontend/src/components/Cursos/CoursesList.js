import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true,
})(TablePaginationActions);

const styles = theme => ({
  root: {
    width: '93.5%',
    marginLeft: '3.5%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CoursesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 5,
      link: '/',
      redirect: false,
    };
  }

  componentWillReceiveProps({ cursos }) {
    this.setState({
      data: cursos.sort(
        (a, b) => (a.semester__year > b.semester__year ? -1 : 1),
      ),
    });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleClick = teacher => {
    this.setState({
      link: '/profesor/' + teacher,
      redirect: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page } = this.state;
    const emptyRows = 0;
    // rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={this.state.link} />;
    } else {
      return (
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(curso => {
                    const seccion = 'Sección ' + curso.section;
                    const semestre =
                      curso.semester__year + ' ' + curso.semester__name;
                    const teacher = curso.teacher.toLowerCase();
                    const nota = parseFloat(curso.noteCourse).toFixed(1);
                    const votos = parseInt(curso.votes, 10);

                    return (
                      <TableRow hover key={semestre + curso.section + teacher}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            fontSize: 16,
                          }}
                        >
                          {semestre}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: 16,
                          }}
                        >
                          {seccion}
                        </TableCell>
                        <TableCell
                          onClick={event => this.handleClick(teacher)}
                          className={'teacher-td'}
                          style={{
                            textTransform: 'capitalize',
                            fontSize: 16,
                            cursor: 'pointer',
                          }}
                        >
                          {teacher}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: 16,
                          }}
                        >
                          {nota} ({votos} votos)
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    className="tableFooter"
                    style={{
                      fontSize: 14,
                    }}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      );
    }
  }
}

export default withStyles(styles)(CoursesList);
