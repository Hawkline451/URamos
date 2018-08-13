import React, { Component } from 'react';
import CommentsList from './CommentsList';

class Comentarios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comentarios: [],
    };
  }

  componentWillReceiveProps({ comentarios }) {
    this.setState({
      comentarios: comentarios,
    });
  }

  render() {
    console.log(this.state.comentarios);
    console.log(this.state.comentarios.length === 0);
    if (this.state.comentarios.length === 0) {
      return <div />;
    } else {
      return (
        <div style={{ marginBottom: 50 }}>
          <CommentsList comentarios={this.state.comentarios} />
        </div>
      );
    }
  }
}

export default Comentarios;
