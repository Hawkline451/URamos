import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Comment from "./Comment";
import axios from "axios";
import URL_BACKEND from '../../routes/Host'


class CommentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comentarios: this.props.comentarios,
            isMod: false,
            isReade: false,
            isLocked: false,
        };
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            axios({
                method: 'post',
                url: URL_BACKEND+'/moderator/moderatorCourse',
                data: 'value=' + this.props.match.params.code,
                responseType: 'json',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                },
            }).then(({data}) => {
                this.setState({
                    isMod: data.isModerator,
                    isReady: true,
                    isLocked: data.isLocked,
                });
            });
        } else {
            this.setState({
                isMod: false,
                isReady: true,
                isLocked: false
            })
        }


    }

    componentWillReceiveProps(props) {
        this.setState({
            comentarios: props.comentarios,
        });
    }

    render() {
        if (this.state.isReady) {
            return (<div>
                <Paper
                    style={{
                        width: '93.5%',
                        marginTop: '2%',
                        marginLeft: '3.5%',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        padding: 15
                    }}
                >
                    {this.state.comentarios.map((comentario, index) => {
                        return <Comment key={index} comentario={comentario} isMod={this.state.isMod} isLocked={this.state.isLocked}/>;
                    })}
                </Paper>
            </div>);
        } else {
            return (<div></div>);
        }
    }
}

export default CommentsList;
