import { JWTSTATUS } from '../actions';

const JWTStatus = (state=JWTSTATUS.WITHOUT_JWT, action) => {
	switch (action.type){
		case 'SET_JWT_STATUS':
			state=action.jwt_status;
		default:
			return state;
		return state;
	}
}

export default JWTStatus;