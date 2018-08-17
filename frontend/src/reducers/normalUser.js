const normalUser = (state={}, action) => {
	switch(action.type){
		case 'SET_NORMAL_USER':
			return Object.assign({}, state, {
							'first_name': action.normalUser.first_name,
							'last_name': action.normalUser.last_name
						});
		case 'DELETE_USER':
			return {};
		default:
			return state;
	}
}

export default normalUser;