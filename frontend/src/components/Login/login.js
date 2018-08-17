import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { JWTSTATUS, setJWTStatus } from '../../actions';

const Login = (props)=>{
  token = props.match.params.jwt
  localStorage.setItem('token', token)

	fetch('http://142.93.4.35:3000/user/', {
      headers: {
            Authorization: `JWT ${token}`
          }
      })
      .then(res => res.json())
      .then(json => {
          localStorage.setItem('user', JSON.stringify(json));
      });
    fetch('http://142.93.4.35:3000/auth/current_user/', {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(res => res.json())
    .then(json => {
          localStorage.setItem('normal_user', JSON.stringify(json));
    });

    return <Redirect to='/'/>;
};

export default connect()(Login);