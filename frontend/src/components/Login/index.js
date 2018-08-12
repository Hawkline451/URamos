import React from 'react';
import { connect } from 'react-redux'
import LoginBar from './login_bar';
import InfoUser from './info_user';
import { JWTSTATUS} from '../../actions';

{/*import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip'; */}
/*<li onClick={handle_logout}>logout</li>*/


function Login(props){
	return props.jwtIsUpdated ? (<InfoUser />) : (<LoginBar />);
}

const mapStateToProps = (state) =>{
	return{
		jwtIsUpdated: state.JWTStatus === JWTSTATUS.JWT_UPDATED
	};
}

export default connect(mapStateToProps) (Login);
