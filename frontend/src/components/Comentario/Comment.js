import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AnimalAvatar from './AnimalAvatar';
import Likes from './Likes';
import Moderar from './Moderar';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comentario: this.props.comentario,
      upVotes: this.props.comentario.positivePoints,
      downVotes: this.props.comentario.negativePoints,
    };
  }

  handleUpVotes = () => {
    this.setState({
      upVotes: this.state.upVotes + 1,
    });
  };

  handleDownVotes = () => {
    this.setState({
      downVotes: this.state.downVotes + 1,
    });
  };

  render() {
    return (
      <div>
        <Paper square style={{ textAlign: 'left' }}>
          <div
            style={{
              padding: '1%',
              width: '12%',
              textAlign: 'center',
              display: 'inline-block',
              height: '100%',
            }}
          >
            <AnimalAvatar name={this.state.comentario.user__nickname} />
            <Typography
              variant="headline"
              style={{
                marginTop: 10,
                marginLeft: 0,
              }}
            >
              {this.state.comentario.user__nickname}
            </Typography>
            <Typography
              variant="title"
              style={{
                marginTop: 25,
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              {this.state.comentario.date}
            </Typography>
          </div>
          <div
            style={{
              padding: '1%',
              display: 'inline-block',
              verticalAlign: 'top',
              height: '100%',
              borderLeft: '1px black solid',
              borderRight: '1px black solid',
              minHeight: 200,
            }}
          >
            <Typography
              variant="title"
              style={{
                display: 'inline-block',
              }}
            >
              Semestre:{' '}
              <strong>
                {this.state.comentario.course__semester__year}{' '}
                {this.state.comentario.course__semester__name}
              </strong>
            </Typography>
            <Typography
              variant="title"
              style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                float: 'right',
              }}
            >
              Profesor:{' '}
              <strong>
                {this.state.comentario.course__teacher__name.toLowerCase()}
              </strong>
            </Typography>
            <div
              style={{
                marginTop: 20,
                padding: 10,
                border: '2px gray solid',
                borderRadius: 5,
                width: 1200,
                wordBreak: 'break-all',
                wordWrap: 'break-word',
              }}
            >
              <Typography variant="headline">
                {this.state.comentario.content}
              </Typography>
            </div>
            <div
              style={{
                verticalAlign: 'bottom',
                marginBottom: 10,
              }}
            >
              <Likes
                markTeacher={this.state.comentario.noteTeacher}
                markCourse={this.state.comentario.noteCourse}
                comment={this.state.comentario.id}
                upVotes={this.state.upVotes}
                handleUpVotes={this.handleUpVotes}
                downVotes={this.state.downVotes}
                handleDownVotes={this.handleDownVotes}
              />
            </div>
          </div>
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              marginTop: 80,
              marginLeft: 50,
            }}
          >
            <Moderar
              nickname={this.state.comentario.user__nickname}
              profesor={this.state.comentario.course__teacher__name.toLowerCase()}
              curso={
                this.state.comentario.course__semester__name +
                ' ' +
                this.state.comentario.course__semester__year
              }
              comentario={this.state.comentario.id}
              content={this.state.comentario.content}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default Comment;
