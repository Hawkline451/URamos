import { AUTHSTATUS } from '../actions';

const authStatus = (state=AUTHSTATUS.LOGGED_OUT, action) => {
	switch (action.type){
		case 'SET_AUTH_STATUS':
			return action.auth_status;
		default:
			return state;
	}
}

export default authStatus;