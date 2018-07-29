import React, {Component} from "react";
import {deepOrange500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardHeader} from "material-ui/Card";

import DataTables from "material-ui-datatables";

import axios from "axios";

const styles = {
    container: {
        textAlign: 'center',
    },
    component: {
        margin: '60px 20px',
    },
    titleStyle: {
        fontSize: 16,
        color: deepOrange500,
    },
    footerToolbarStyle: {
        padding: '0 100px',
    },
    tableStyle: {
        tableLayout: 'auto',
    },
    tableBodyStyle: {
        overflowX: 'auto',
    },
    tableWrapperStyle: {
        padding: 5,
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

const TABLE_COLUMNS = [
    {
        key: 'ramo',
        label: 'Curso',
    }, {
        key: 'nota',
        label: 'Promedio',
    },
];

const TABLE_COLUMNS_SORT_STYLE = [
    {
        key: 'ramo',
        label: 'Curso',
        sortable: true,
        style: {
            width: 250,
        }
    },
];

const TABLE_COLUMNS_CLASSNAME = [
    {
        key: 'ramo',
        label: 'Curso',
        className: 'important-column',
    }, {
        key: 'nota',
        label: 'Promedio',
        className: 'important-column',
    },
];

var TABLE_DATA = [];

function setSuggestion(suggestion) {
    TABLE_DATA = suggestion;
}

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);

        this.state = {
            suggestions: [],
            page: 1,
            value: '',
            rows: 100,
        };
    }

    getInfo = () => {
        axios.post('http://localhost:8000/search/courses/', {
            value: this.state.value,
            page: this.state.page,
        }).then(({data}) => {
            var {algo, otro} = data;
            console.log(otro);
            const newData = data.map((item) => {
                return {'ramo': item.code + ' - ' + item.name, 'nota': item.note}
            });
            this.setState({
                suggestions: newData
            });
            //console.log(this.state.suggestions)
            //setSuggestion(this.state.suggestions);
        });
     /*   axios({
            method: 'post',
            url: 'http://localhost:8000/search/courses/',
            data: 'value=' + this.state.value + " page=" + this.state.page,
            responseType: 'json'
        }).then(({data}) => {
            const newData = data.map((item) => {
                return {'ramo': item.code + ' - ' + item.name, 'nota': item.note}
            });
            this.setState({
                suggestions: newData
            });
            //setSuggestion(this.state.suggestions);
        });*/
    };

    handleFilterValueChange(value) {
        this.setState({
            value: value,
        }, () => {
            if (this.state.value && this.state.value.length > 1) {
                if (this.state.value.length >= 2) {
                    this.getInfo()
                }
            } else if (!this.state.value) {
            }
        });
    };

    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
    };

    handleNextPageClick() {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            if (this.state.value && this.state.value.length > 1) {
                if (this.state.value.length >= 2) {
                    this.getInfo()
                }
            } else if (!this.state.value) {
            }
        });
    }

    handlePreviousPageClick() {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1,
            }, () => {
                if (this.state.value && this.state.value.length > 1) {
                    if (this.state.value.length >= 2) {
                        this.getInfo()
                    }
                } else if (!this.state.value) {
                }
            });
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <div style={styles.component}>
                        <Card style={{margin: 12, textAlign: 'left'}}>
                            <DataTables
                                title={'Cursos'}
                                height={'auto'}
                                selectable={false}
                                showRowHover={true}
                                columns={TABLE_COLUMNS}
                                data={this.state.suggestions}
                                page={this.state.page}
                                rowsPerPage={10}
                                multiSelectable={false}
                                showHeaderToolbar={true}
                                showCheckboxes={false}
                                enableSelectAll={false}
                                showFooterToolbar={true}
                                headerToolbarMode={'filter'}
                                onCellClick={this.handleCellClick}
                                onNextPageClick={this.handleNextPageClick}
                                onPreviousPageClick={this.handlePreviousPageClick}
                                onFilterValueChange={this.handleFilterValueChange}
                                count={this.state.rows}
                            />
                        </Card>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;