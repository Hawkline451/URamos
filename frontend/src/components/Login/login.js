import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { JWTSTATUS, setJWTStatus, AUTHSTATUS, setAuthStatus } from '../../actions';

const Login = (props)=>{
  var token = props.match.params.jwt
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

const mapStateToProps = (state) => {
  return{
    isLogged: state.authStatus === AUTHSTATUS.LOGGED_IN, 
    JWTStatus: state.JWTStatus
  }
}

const mapDispatchToProps = dispatch => {
  return{
    set_auth_status: stats => dispatch(setAuthStatus(stats))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);