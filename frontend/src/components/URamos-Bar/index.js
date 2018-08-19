import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import IntegrationAutosuggest from "../Buscador";
import Login from "../Login";
import "./styles.css";
import RadioButtonGroup from "../RadioButtons";

class UramosBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            normal_user: JSON.parse(localStorage.getItem('normal_user')),
            user_info: '',
            mod_info: '',
            search: 'codigo',
        };
    }

    componentDidMount() {
        if (localStorage.getItem('isLogged') === 'true') {
            fetch('http://142.93.4.35:3000/auth/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                },
            })
                .then(res => res.json())
                .then(json => {
                    localStorage.setItem('normal_user', JSON.stringify(json));

                    this.setState({normal_user: json});
                });

            this.setState({
                user: JSON.parse(localStorage.getItem('user')),
                normal_user: JSON.parse(localStorage.getItem('normal_user')),
            });

            const infMod = (
                <Button color="inherit" href={'/moderar'}>
                    Cursos a Moderar
                </Button>
            );
            const user = (
                <Button color="inherit" href={'/evaluacion'}>
                    Evaluar
                </Button>
            );
            this.setState({user_info: user});
            if (this.state.user.isModerator) {
                this.setState({mod_info: infMod});
            }
        }
    }

    changeSearchValue(searchValue) {
        this.setState({
            search: searchValue
        });
    }

    render() {
        return (
            <div className="App-bar-custom">
                <AppBar position="static" color="default">
                    <ToolBar
                        className="main-toolbar"
                        style={{
                            paddingLeft: 0,
                        }}
                    >
                        <Button color="inherit" href={'/'}>
                            <SvgIcon
                                style={{
                                    fontSize: 40,
                                    color: 'white',
                                }}
                            >
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </SvgIcon>
                        </Button>
                        <div className="buttons">
                            {this.state.user_info}
                            {this.state.mod_info}
                            <Button color="inherit" href={'/busqueda'}>
                                Todos los cursos
                            </Button>
                        </div>
                        <div className="search-frame">
                            <div className="search-bar">
                                <IntegrationAutosuggest search={this.state.search}/>
                            </div>
                            <div
                                style={{
                                    display: 'inline-block'
                                }}
                            >
                                <RadioButtonGroup changeSearch={this.changeSearchValue.bind(this)}/>
                            </div>
                        </div>
                        <div className="right-user-div" align="right">
                            <ToolBar>
                                <Login />
                            </ToolBar>
                        </div>
                    </ToolBar>
                </AppBar>
            </div>
        );
    }
}

export default UramosBar;