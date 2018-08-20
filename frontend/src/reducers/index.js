import { combineReducers } from 'redux';
import JWTStatus from './jwtStatus';
import authStatus from './authStatus';
import user from './user';
import normalUser from './normalUser'

export default combineReducers({
	JWTStatus,
	authStatus,
	user,
	normalUser
});