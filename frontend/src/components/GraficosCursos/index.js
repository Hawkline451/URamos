import LineGroups from './LineGroups'

var React = require('react');
var Component = React.Component;

class Graph extends Component {
    render() {
        const {code} = this.props;
        if (code !== null) {
           return <LineGroups code={code}/>
        } else {
            return <div></div>
        }
    }

}

export default Graph;