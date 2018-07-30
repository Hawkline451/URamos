import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';



function Login(props){
	console.log("hola")
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
        localStorage.setItem('token', json.token);
        localStorage.setItem('normal_user', JSON.stringify(json.user));
        localStorage.setItem('isLogged', true);
    	});

    return <Redirect to='/'/>;

}

export default Login;