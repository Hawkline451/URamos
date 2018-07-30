import { BrowserRouter as Router, Redirect} from 'react-router-dom';
import React from 'react';

function Logout(){
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	localStorage.removeItem('normal_user');
	localStorage.setItem('isLogged', false);

	return <Redirect to='/'/>;
}

export default Logout;