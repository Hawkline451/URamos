import { JWTSTATUS } from '../actions';

const JWTStatus = (state=JWTSTATUS.WITHOUT_JWT, action) => {
	switch (action.type){
		case 'SET_JWT_STATUS':
			state=action.jwt_status;
			return state;
		default:
			return state;
	}
}

export default JWTStatus;