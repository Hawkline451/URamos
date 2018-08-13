import React, {Component} from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import axios from "axios";
import ListRecentLog from './ListRecentLog';

class RecentActList extends Component {
    state = {
        listLog: []
    };

    componentWillMount() {
        axios({
            method: 'post',
            //142.93.4.35
            url: 'http://localhost:3000/logging/record/',
            responseType: 'json',
        }).then(({data}) => {
            const newData = data.map(item => {
                var classLog = '';
                if (item.typeRecord === 0) {
                    classLog = "default"
                } else if (item.typeRecord === 1) {
                    classLog = "warning"
                } else {
                    classLog = "danger"
                }
                return {firstComment: item.firstComment, secondComment: item.secondComment, class: classLog};
            });
            this.setState({
                listLog: newData,
            });
        });
    };

    render() {
        return (
            <div className="list-div">
                <List>
                    <Divider />
                    <ListRecentLog list = {this.state.listLog}/>
                </List>
            </div>
        );
    }
}

export default RecentActList;
