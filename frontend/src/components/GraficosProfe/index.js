import LineGroups from './LineGroups'

var React = require('react');
var Component = React.Component;

class Graph extends Component {
    render() {
        const {name} = this.props;
        if (name !== null) {
           return <LineGroups name={name}/>
        } else {
            return <div></div>
        }
    }

}

export default Graph;