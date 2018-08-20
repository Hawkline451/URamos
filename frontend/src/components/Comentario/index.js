import React, { Component } from 'react';
import CommentsList from './CommentsList';

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
      isMod: false
    };
  }

  componentWillReceiveProps(props) {
    console.log("comentario:")
    console.log(props)
    this.setState({
      comentarios: props.comentarios,
      isMod: props.isMod
    });
  }

  render() {
    if (this.state.comentarios.length === 0) {
      return <div />;
    } else {
      return (
        <div style={{ marginBottom: 50 }}>
          <CommentsList comentarios={this.state.comentarios} isMod={this.state.isMod}/>
        </div>
      );
    }
  }
}

export default Comentarios;
