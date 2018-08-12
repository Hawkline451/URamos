import { JWTSTATUS } from '../actions';

const JWTStatus = (state=JWTSTATUS.WITHOUT_JWT, action) => {
	switch (action.type){
		case 'SET_JWt_STATUS':
			return action.jwt_status;
		default:
			return state;
	}
}

export default JWTStatus;