import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setJWT, JWTSTATUS, setJWTStatus } from '../../actions';




const Login = (props)=>{
  console.log(props.dispatch)
	fetch('http://142.93.4.35:3000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username" : props.match.params.rut.toString(),
        "password" : props.match.params.rut.toString()
      })
    })
      .then(res => res.json())
      .then(json => {
        props.dispatch(setJWT(json.token));
        props.dispatch(setJWTStatus(JWTSTATUS.JWT_UPDATED))
        localStorage.setItem('token', json.token);
        localStorage.setItem('normal_user', JSON.stringify(json.user));
        localStorage.setItem('isLogged', true);
    	});

    return <Redirect to='/'/>;

}

export default connect()(Login);