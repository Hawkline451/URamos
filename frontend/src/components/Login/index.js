import React from 'react';
import { connect } from 'react-redux'
import LoginBar from './login_bar';
import InfoUser from './info_user';
import { JWTSTATUS, setJWTStatus} from '../../actions';

function Login(props){
	var haveJWT = props.jwtIsUpdated;
	if(localStorage.getItem('token')){
		props.set_jwt_status(JWTSTATUS.JWT_UPDATED);
		haveJWT = true;
	}
	return props.jwtIsUpdated ? (<InfoUser />) : (<LoginBar />);
}

const mapStateToProps = state =>{
	return{
		jwtIsUpdated: state.JWTStatus === JWTSTATUS.JWT_UPDATED
	};
};

const mapDispatchToProps = dispatch => {
	return {
		set_jwt_status: stats => dispatch(setJWTStatus(stats))
	};  
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);
