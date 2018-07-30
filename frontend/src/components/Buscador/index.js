import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

let suggestions = [];

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  const code = parts[0].text + parts[1].text.split(' - ')[0];

  return (
    <MenuItem selected={isHighlighted} component="div" divider button>
      <Link to={'/cursos/' + code} style={{ color: '#000000' }}>
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </Link>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function setSuggestion(suggestion) {
  suggestions = suggestion;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        return keep;
      });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 250,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    width: 520,
    maxHeight: 500,
    overflowY: 'scroll',
    overflowX: 'hidden',
    paddingRight: 17,
  },
  suggestion: {
    display: 'block',
    width: 520,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class IntegrationAutosuggest extends React.Component {
  state = {
    value: '',
    suggestions: [],
  };

  getInfo = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/search/',
      data: 'value=' + this.state.value,
      responseType: 'json',
    }).then(({ data }) => {
      const newData = data.map(item => {
        return { label: item.code + ' - ' + item.name };
      });
      this.setState({
        suggestions: newData,
      });
      setSuggestion(this.state.suggestions);
    });
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState(
      {
        value: newValue,
      },
      () => {
        if (this.state.value && this.state.value.length > 1) {
          if (this.state.value.length === 2) {
            this.getInfo();
          }
        } else if (!this.state.value) {
        }
      },
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: 'Buscar curso',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
