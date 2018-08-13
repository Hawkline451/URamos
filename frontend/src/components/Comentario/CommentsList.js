import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Comment from './Comment';

class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comentarios: this.props.comentarios,
    };
  }

  componentWillReceiveProps({ comentarios }) {
    this.setState({
      comentarios: comentarios,
    });
  }

  render() {
    return (
      <div>
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
            return <Comment key={index} comentario={comentario} />;
          })}
        </Paper>
      </div>
    );
  }
}

export default CommentsList;
