import { BrowserRouter as Router, Redirect} from 'react-router-dom';
import React from 'react';
import { JWTSTATUS,AUTHSTATUS, setJWTStatus, setAuthStatus } from '../../actions';
import { connect } from 'react-redux';


const Logout = (props) => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	localStorage.removeItem('normal_user');
	props.dispatch(setJWTStatus(JWTSTATUS.WITHOUT_JWT));
	props.dispatch(setAuthStatus(AUTHSTATUS.LOGGED_OUT));
	return <Redirect to='/'/>;
}

export default connect()(Logout);