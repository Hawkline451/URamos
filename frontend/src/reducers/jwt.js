const jwt = (state = '', action) => {
	switch (action.type){
		case 'SET_JWT':
			return action.jwt;
		default:
			return state;
	}
}

export default jwt;