import React from 'react';
import LoginBar from './login_bar';
import InfoUser from './info_user';

function Login(props){
	
	return (localStorage.getItem('isLogged') === 'true') ? (<InfoUser />): (<LoginBar />);
}

export default Login;
