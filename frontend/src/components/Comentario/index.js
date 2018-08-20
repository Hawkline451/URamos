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

  componentWillReceiveProps({ comentarios }, isMod) {
    this.setState({
      comentarios: comentarios,
      isMod: isMod
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
          <CommentsList comentarios={this.state.comentarios} isMod={this.state.isMod}/>
        </div>
      );
    }
  }
}

export default Comentarios;
