import { AUTHSTATUS } from '../actions';

const authStatus = (state=AUTHSTATUS.LOGGED_OUT, action) => {
	switch (action.type){
		case 'SET_AUTH_STATUS':
			state = action.auth_status;
			return state;
		default:
			return state;
	}
}

export default authStatus;