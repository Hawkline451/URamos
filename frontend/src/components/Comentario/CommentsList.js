import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Comment from './Comment';
import axios from 'axios';

class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comentarios: this.props.comentarios,
      isMod: false,
      isReade: false
    };
  }

  componentWillMount(){
    console.log("que sucede")
    console.log(this.props.match.params.code)
    axios({
      method: 'post',
      url: 'http://142.93.4.35:3000/moderator/moderatorCourse',
      data: 'value='+this.props.match.params.code,
      responseType: 'json',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    }).then(({data})=> {
      console.log(data)
      this.setState({
        isMod: data.isModerator,
        isReady: true
      });
    });
    
  }

  componentWillReceiveProps(props) {
    this.setState({
      comentarios: props.comentarios,
    });
  }

  render() {
      if(this.state.isReady){
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
            return <Comment key={index} comentario={comentario} isMod={this.state.isMod} />;
          })}
        </Paper>
      </div>);
      }else{
        return (<div></div>);
      }
  }
}

export default CommentsList;
