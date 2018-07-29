import React, { Component } from 'react';
import {BrowserRouter as Redirect} from 'react-router-dom';

class Logout extends Component {
	
	componentDidMount(){
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('normal_user');
		localStorage.setItem('isLogged', false);
	}

	render(){
	    return <Redirect to='/'/>;
	}
}

export default Logout;