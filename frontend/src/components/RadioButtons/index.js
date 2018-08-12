import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";

const styles = theme => ({
    root: {
        display: 'flex',
        color: grey[50],
        '&$checked': {
            color: grey[50],
        },
    },
    formControl: {
        paddingTop: theme.spacing.unit * 0.5,
        marginLeft: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    checked: {},
    size: {
        width: 40,
        height: 40,
    },
    sizeIcon: {
        fontSize: 20,
    },
});

class RadioButtonsGroup extends React.Component {
    state = {
        value: 'codigo',
    };

    handleChange = event => {
        this.setState(
            {value: event.target.value},
            () => {
                this.props.changeSearch(this.state.value);
            }
        );
    };

    render() {
        const {classes} = this.props;

        return (
           // <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup row
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    >
                        <FormControlLabel
                            value="codigo"
                            control={<Radio
                                classes={{
                                    root: classes.root,
                                    checked: classes.checked,
                                    size: classes.size,
                                }}
                                icon={<RadioButtonUncheckedIcon className={classes.sizeIcon}/>}
                                checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon}/>}
                            />}
                            label={<h5 style={{color: 'white'}}>Código</h5>}
                        />
                        <FormControlLabel
                            value="nombre"
                            control={<Radio
                                classes={{
                                    root: classes.root,
                                    checked: classes.checked,
                                    size: classes.size,
                                }}
                                icon={<RadioButtonUncheckedIcon className={classes.sizeIcon}/>}
                                checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon}/>}
                            />}
                            label={<h5 style={{color: 'white'}}>Nombre</h5>}
                        />
                    </RadioGroup>
                </FormControl>
            //</div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);