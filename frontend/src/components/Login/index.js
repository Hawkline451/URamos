import React from 'react';
import LoginBar from './login_bar';
import InfoUser from './info_user';
{/*import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip'; */}
/*<li onClick={handle_logout}>logout</li>*/


function Login(props){
	var logged_in = localStorage.getItem('isLogged');

	const logged_out_nav = (
		<LoginBar />
	);

	const logged_in_nav = (
		<InfoUser />
	);

	return <div>{logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Login;
