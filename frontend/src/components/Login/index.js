import React from 'react';
import LoginBar from './login_bar'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


function Login(props){
	const logged_out_nav = (
		<LoginBar />
	);

	const logged_in_nav = (
		<Chip avatar={<Avatar>{props.get_user.nickname}</Avatar>} label="User Name" />+
		<li onClick={props.handle_logout}>logout</li>
	);

	return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Login;
Login.propTypes = {
	logged_in: PropTypes.bool.isRequired,
	handle_logout: PropTypes.func.isRequired
};