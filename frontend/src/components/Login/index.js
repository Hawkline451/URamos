import React from 'react';
import { connect } from 'react-redux'
import LoginBar from './login_bar';
import InfoUser from './info_user';
import { JWTSTATUS, setJWTStatus} from '../../actions';

{/*import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip'; */}
/*<li onClick={handle_logout}>logout</li>*/


function Login(props){
	var haveJWT = props.jwtIsUpdated;
	if(localStorage.getItem('token')){
		props.set_jwt_status(JWTSTATUS.JWT_UPDATED);
		haveJWT = true;
	}
	return props.jwtIsUpdated ? (<InfoUser />) : (<LoginBar />);
}

const mapStateToProps = (state) =>{
	return{
		jwtIsUpdated: state.JWTStatus === JWTSTATUS.JWT_UPDATED
	};
}

const mapDispatchToProps = dispatch => ({
  set_jwt_status: stats => dispatch(setJWTStatus(stats))
})

export default connect(mapStateToProps, mapDispatchToProps) (Login);
