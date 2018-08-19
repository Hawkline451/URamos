import React from 'react';
import { connect } from 'react-redux'
import LoginBar from './login_bar';
import InfoUser from './info_user';
import { setJWTStatus, AUTHSTATUS} from '../../actions';

function Login(props){
	return props.isLogged ? (<InfoUser />) : (<LoginBar />);
}

const mapStateToProps = state =>{
	return{
		isLogged: state.authStatus === AUTHSTATUS.LOGGED_IN
	};
};

const mapDispatchToProps = dispatch => {
	return {
		set_jwt_status: stats => dispatch(setJWTStatus(stats))
	};  
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);
