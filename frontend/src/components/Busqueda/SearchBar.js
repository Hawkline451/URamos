import React, {Component} from "react";
import {deepOrange500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Card from "material-ui/Card";

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

const TABLE_COLUMNS_INIT = [
    {
        key: 'dpto',
        label: 'Departamento'
    },
];

const TABLE_DATA = [
    {dpto: 'AA - Área para el Aprendizaje de la Ingeniería y Ciencias A2IC'},
    {dpto: 'AS - Departamento de Astronomía'},
    {dpto: 'CC - Departamento de Ciencias de la Computación'},
    {dpto: 'CI - Departamento de Ingeniería Civil'},
    {dpto: 'CM - Departamento de Ciencia de los Materiales'},
    {dpto: 'DR - Área de Deportes, Recreación y Cultura'},
    {dpto: 'ED - Doctorado en Ingeniería Eléctrica'},
    {dpto: 'EH - Área de Estudios Humanísticos'},
    {dpto: 'EI - Área de Idiomas, Escuela de Ingeniería'},
    {dpto: 'EI - Área de Ingeniería e Innovación'},
    {dpto: 'EI - Escuela de Ingeniería'},
    {dpto: 'EL - Departamento de Ingeniería Eléctrica'},
    {dpto: 'EP - Escuela de Postgrado'},
    {dpto: 'ES - Escuela de Ingeniería y Ciencias'},
    {dpto: 'FG - Plataforma'},
    {dpto: 'FI - Departamento de Física'},
    {dpto: 'GF - Departamento de Geofísica'},
    {dpto: 'GL - Departamento de Geología'},
    {dpto: 'IN - Departamento de Ingeniería Industrial'},
    {dpto: 'MA - Departamento de Ingeniería Matemática'},
    {dpto: 'ME - Departamento de Ingeniería Mecánica'},
    {dpto: 'MI - Departamento de Ingeniería de Minas'},
    {dpto: 'MT - Doctorado en Ciencias de los Materiales'},
    {dpto: 'QB - Departamento de Ingeniería Química y Biotecnología'}
];

/*
 function setSuggestion(suggestion) {
 TABLE_DATA = suggestion;
 }
 */

function filterData(data) {
    var newData = [];
    for (var i = 0; i < data.length - 1; i++) {
        newData.push(data[i]);
    }
    return newData;
}

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);

        this.state = {
            columns: TABLE_COLUMNS_INIT,
            suggestions: TABLE_DATA,
            page: 1,
            value: '',
            rows: 24,
            showFooter: false
        };
    }

    getInfo = () => {
        axios.post('http://localhost:8000/search/courses/', {
            value: this.state.value,
            page: this.state.page,
        }).then(({data}) => {
            var pages = 0;
            const newDataAux = data.map((item) => {
                pages = item.page;
                return {'ramo': item.code + ' - ' + item.name, 'nota': item.note}
            });
            const newData = filterData(newDataAux);
            this.setState({
                suggestions: newData,
                rows: pages
            });
        });
    };

    handleFilterValueChange(value) {
        this.setState({
            value: value,
            showFooter: true,
            rows: 0,
            columns: TABLE_COLUMNS,
        }, () => {
            if (this.state.value && this.state.value.length > 1) {
                if (this.state.value.length >= 2) {
                    this.getInfo()
                }
            } else if (this.state.value.length >= 0 && this.state.value.length < 2) {
                this.setState({
                    suggestions: TABLE_DATA,
                    showFooter: false,
                    rows: 24,
                    columns: TABLE_COLUMNS_INIT,
                })
            } else if (!this.state.value) {
            }
        });
    };

    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
        console.log
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
                                columns={this.state.columns}
                                data={this.state.suggestions}
                                page={this.state.page}
                                rowsPerPage={10}
                                multiSelectable={false}
                                showHeaderToolbar={true}
                                showCheckboxes={false}
                                enableSelectAll={false}
                                showFooterToolbar={this.state.showFooter}
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