import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';

class Login extends Component {

	componentDidMount(){
		fetch('http://142.93.4.35:3000/token-auth/', {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        "username" : this.props.match.params.rut.toString(),
	        "password" : this.props.match.params.rut.toString()
	      })
	    })
	      .then(res => res.json())
	      .then(json => {
	        localStorage.setItem('token', json.token);
	        localStorage.setItem('normal_user', JSON.stringify(json.user));
	        localStorage.setItem('isLogged', true);
	    });
	}

	render(){
    	return <Redirect to='/'/>;
	}

}

export default Login;