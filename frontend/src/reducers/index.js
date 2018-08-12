import { combineReducers } from 'redux';
import JWTStatus from './jwtStatus';
import jwt from './jwt';
import authStatus from './authStatus';
import user from './user';


export default combineReducers({
	JWTStatus,
	jwt,	
	authStatus,
	user
});