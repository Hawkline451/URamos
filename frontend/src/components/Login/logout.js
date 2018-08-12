import { BrowserRouter as Router, Redirect} from 'react-router-dom';
import React from 'react';
import { JWTSTATUS,AUTHSTATUS, setJWTStatus, setAuthStatus } from '../../actions';
import { connect } from 'react-redux';


const Logout = (props) => {
	props.dispatch(setJWTStatus(JWTSTATUS.WITHOUT_JWT));
	props.dispatch(setAuthStatus(AUTHSTATUS.LOGGED_OUT));
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	localStorage.removeItem('normal_user');
	return <Redirect to='/'/>;
}

export default connect()(Logout);