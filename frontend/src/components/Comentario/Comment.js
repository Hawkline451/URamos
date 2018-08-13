import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AnimalAvatar from './AnimalAvatar';
import Likes from './Likes';
import Moderar from './Moderar';

class Comment extends Component {
  render() {
    const { comentario } = this.props;
    console.log(comentario);
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
            <AnimalAvatar name={comentario.user__nickname} />
            <Typography
              variant="headline"
              style={{
                marginTop: 10,
                marginLeft: 0,
              }}
            >
              {comentario.user__nickname}
            </Typography>
            <Typography
              variant="title"
              style={{
                marginTop: 25,
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              {comentario.date}
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
                {comentario.course__semester__year}{' '}
                {comentario.course__semester__name}
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
              <strong>{comentario.course__teacher__name.toLowerCase()}</strong>
            </Typography>
            <div
              style={{
                marginTop: 20,
                padding: 10,
                border: '2px gray solid',
                borderRadius: 5,
                width: 1000,
                wordBreak: 'break-all',
                wordWrap: 'break-word',
              }}
            >
              <Typography variant="headline">{comentario.content}</Typography>
            </div>
            <div
              style={{
                verticalAlign: 'bottom',
                marginBottom: 10,
              }}
            >
              <Likes
                markTeacher={comentario.noteTeacher}
                markCourse={comentario.noteCourse}
                comment={comentario.id}
                upVotes={comentario.positivePoints}
                downVotes={comentario.negativePoints}
              />
            </div>
          </div>
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              marginTop: 80,
              marginLeft: 130,
            }}
          >
            <Moderar
              nickname={comentario.user__nickname}
              profesor={comentario.course__teacher__name.toLowerCase()}
              curso={
                comentario.course__semester__name +
                ' ' +
                comentario.course__semester__year
              }
              comentario={comentario.id}
              content={comentario.content}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default Comment;
