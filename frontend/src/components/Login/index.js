import React from 'react';
import LoginBar from './login_bar';
import InfoUser from './info_user';
{/*import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip'; */}


function Login(props){
	var logged_in = !(localStorage.getItem('token') === null);

	const logged_out_nav = (
		<LoginBar />
	);

	const handle_logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('normal_user');
	}; 

	const logged_in_nav = (
		<InfoUser />+
		<li onClick={handle_logout}>logout</li>
	);

	return <div>{logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Login;
