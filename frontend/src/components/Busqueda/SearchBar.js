import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader} from 'material-ui/Card';

import DataTables from 'material-ui-datatables';

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
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  }, {
    key: 'fat',
    label: 'Fat (g)',
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
  },
];

const TABLE_COLUMNS_TOOLTIP = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    tooltip: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
    tooltip: 'Calories',
  }, {
    key: 'fat',
    label: 'Fat (g)',
    tooltip: 'Fat (g)',
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
    tooltip: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
    tooltip: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
    tooltip: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
    tooltip: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
    tooltip: 'Iron (%)',
  },
];

const TABLE_COLUMNS_SORT_STYLE = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    sortable: true,
    style: {
      width: 250,
    }
  }, {
    key: 'calories',
    label: 'Calories',
    sortable: true,
  }, {
    key: 'fat',
    label: 'Fat (g)',
    alignRight: true,
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
  },
];

const TABLE_COLUMNS_CLASSNAME = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    className: 'important-column',
  }, {
    key: 'calories',
    label: 'Calories',
    className: 'important-column',
  }, {
    key: 'fat',
    label: 'Fat (g)',
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
  },
];

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Eclair',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Cupcake',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Gingerbread',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Jelly bean',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Lollipop',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Honeycomb',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Donut',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'KitKat',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
];

const TABLE_DATA_NEXT = [
  {
    name: 'Marshmallow',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
];

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleCellDoubleClick = this.handleCellDoubleClick.bind(this);
/*    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePersonAddClick = this.handlePersonAddClick.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
*/
    this.state = {
      data: TABLE_DATA,
      page: 1,
    };
  }

  handleSortOrderChange(key, order) {
    console.log('key:' + key + ' order: ' + order);
  }

  handleFilterValueChange(value) {
    console.log('filter value: ' + value);
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex2: ' + rowIndex + ' columnIndex2: ' + columnIndex);
  }
/*
  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows);
  }
/*
  handlePreviousPageClick() {
    console.log('handlePreviousPageClick');
    this.setState({
      data: TABLE_DATA,
      page: 1,
    });
  }

  handleNextPageClick() {
    console.log('handleNextPageClick');
    this.setState({
      data: TABLE_DATA_NEXT,
      page: 2,
    });
  }
/*
  handlePersonAddClick() {
    console.log('handlePersonAddClick');
  }

  handleInfoClick() {
    console.log('handleInfoClick');
  }
*/
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <div style={styles.component}>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <DataTables
                title={'Nutrition'}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={TABLE_DATA}
                multiSelectable={false}
                showHeaderToolbar={true}
                showCheckboxes={false}
                enableSelectAll={false}
                showFooterToolbar={true}
                count={10}
                headerToolbarMode={'filter'}
                onCellClick={this.handleCellClick}
                onCellDoubleClick={this.handleCellDoubleClick}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
              />
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;