import { AUTHSTATUS } from '../actions';

const authStatus = (state=AUTHSTATUS.LOGGED_OUT, action) => {
	switch (action.type){
		case 'SET_AUTH_STATUS':
			state = action.auth_status;
		default:
			return state;
		return state;
	}
}

export default authStatus;