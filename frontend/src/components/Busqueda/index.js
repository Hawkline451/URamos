import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import TopTabs from "./TopTabs";
import Main from "./SearchBar";
import SectionName from "./SectionName";

class Busqueda extends Component {
    render() {
        return (
            <div>
                <Paper elevation={0} square={true}>
                    <TopTabs />
                    <Main />
                </Paper>
            </div>
        );
    }
}

export default Busqueda;