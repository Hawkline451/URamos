import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class Likes extends Component {
  state = {
    commentId: this.props.comment,
    upVotes: this.props.upVotes,
    downVotes: this.props.downVotes,
  };

  handleOnUpVote = event => {
    console.log(this.props.voted);
    if (localStorage.getItem('user')) {
      axios
        .post(
          'http://142.93.4.35:3000/comment/upVote/',
          {
            data: this.state,
          },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
            },
          },
        )
        .then(() => {
          try {
            this.props.handleUpVotes();
          } catch(err) {
            
          }
        });
    }
  };

  handleOnDownpVote = event => {
    console.log(this.state);
    if (localStorage.getItem('user')) {
      axios
        .post(
          'http://142.93.4.35:3000/comment/downVote/',
          {
            data: this.state,
          },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`,
            },
          },
        )
        .then(() => {
          try {
            this.props.handleDownVotes();
          } catch (err) {
            
          }
          
        });
    }
  };

  render() {
    return (
      <div style={{ textAlign: 'right', width: 1200 }}>
        <div
          style={{
            float: 'left',
            marginTop: 20,
            display: 'inline-block',
            marginLeft: 30,
          }}
        >
          <Paper
            style={{
              width: 53,
              height: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="headline"
              style={{ color: 'black', paddingTop: 7, fontSize: 30 }}
            >
              <strong>
                {parseFloat(
                  (this.props.markTeacher + this.props.markCourse) / 2,
                ).toFixed(1)}
              </strong>
            </Typography>
          </Paper>
        </div>
        <div
          style={{ textAlign: 'right', marginTop: 20, display: 'inline-block' }}
        >
          <Paper
            style={{ width: 80, display: 'inline-block', textAlign: 'left' }}
          >
            <div
              onClick={this.handleOnUpVote}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                borderRight: '1px black solid',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              <Avatar
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                  color: 'green',
                }}
              >
                <SvgIcon>
                  <path d="M 2 20 h 2 c 0.55 0 1 -0.45 1 -1 v -9 c 0 -0.55 -0.45 -1 -1 -1 H 2 v 11 Z m 19.83 -7.12 c 0.11 -0.25 0.17 -0.52 0.17 -0.8 V 11 c 0 -1.1 -0.9 -2 -2 -2 h -5.5 l 0.92 -4.65 c 0.05 -0.22 0.02 -0.46 -0.08 -0.66 c -0.23 -0.45 -0.52 -0.86 -0.88 -1.22 L 14 2 L 7.59 8.41 C 7.21 8.79 7 9.3 7 9.83 v 7.84 C 7 18.95 8.05 20 9.34 20 h 8.11 c 0.7 0 1.36 -0.37 1.72 -0.97 l 2.66 -6.15 Z" />
                </SvgIcon>
              </Avatar>
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
              <Typography
                variant="headline"
                style={{ paddingLeft: 15, paddingTop: 12 }}
              >
                <strong>{this.props.upVotes}</strong>
              </Typography>
            </div>
          </Paper>
          <Paper
            style={{
              width: 80,
              display: 'inline-block',
              marginLeft: 30,
              textAlign: 'left',
            }}
          >
            <div
              onClick={this.handleOnDownpVote}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                borderRight: '1px black solid',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              <Avatar
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                  color: 'red',
                }}
              >
                <SvgIcon>
                  <path d="M 22 4 h -2 c -0.55 0 -1 0.45 -1 1 v 9 c 0 0.55 0.45 1 1 1 h 2 V 4 Z M 2.17 11.12 c -0.11 0.25 -0.17 0.52 -0.17 0.8 V 13 c 0 1.1 0.9 2 2 2 h 5.5 l -0.92 4.65 c -0.05 0.22 -0.02 0.46 0.08 0.66 c 0.23 0.45 0.52 0.86 0.88 1.22 L 10 22 l 6.41 -6.41 c 0.38 -0.38 0.59 -0.89 0.59 -1.42 V 6.34 C 17 5.05 15.95 4 14.66 4 h -8.1 c -0.71 0 -1.36 0.37 -1.72 0.97 l -2.67 6.15 Z" />
                </SvgIcon>
              </Avatar>
            </div>
            <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
              <Typography
                variant="headline"
                style={{ paddingLeft: 15, paddingTop: 12 }}
              >
                <strong>{this.props.downVotes}</strong>
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Likes;
