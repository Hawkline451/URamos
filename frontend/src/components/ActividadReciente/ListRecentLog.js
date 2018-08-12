import React, {Component} from "react";
import RecentActs from './RecentActs';

class ListRecentLog extends Component {
    render() {
        const {list} = this.props;
        return (
           list.map(item => {
               return (
                   <RecentActs
                       class = {item.class}
                       text1 = {item.firstComment}
                       text2 = {item.secondComment}
                   />
               )
           })
        );
    }
}

export default ListRecentLog;
