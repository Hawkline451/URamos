import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import Refresh from "@material-ui/icons/Refresh";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class IconReload extends React.Component {

    state = {
        load: false,
    };

    handleChange = () => {
        this.setState(
            {load: true},
            () => {
                this.props.changeLoad(this.state.load);
            }
        );
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button variant="contained" color="default" className={classes.button}
                        onClick= {this.handleChange.bind(this)}
                >
                    Cargar nuevos cursos
                    <Refresh className={classes.rightIcon}/>
                </Button>
            </div>
        );
    }
}

IconReload.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconReload);