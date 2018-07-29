import React from 'react';
import LoginBar from './login_bar';
import InfoUser from './info_user';
{/*import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip'; */}
/*<li onClick={handle_logout}>logout</li>*/


function Login(props){
	
	return (localStorage.getItem('isLogged') === 'true') ? (<InfoUser />): (<LoginBar />);
}

export default Login;
