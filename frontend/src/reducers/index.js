import { combineReducers } from 'redux';
import JWTStatus from './jwtStatus';
import authStatus from './authStatus';

export default combineReducers({
	JWTStatus,
	authStatus,
});