
const user = (state={}, action) => {
	switch(action.type){
		case 'SET_USER':
			return Object.assign({}, state, {
							'nickname': action.user.nickname,
							'isLocked': action.user.isTeacher,
							'isModerator': action.user.isModerator,
							'isTeacher': action.user.isTeacher,
							'teacherName': action.user.teacherName
						});
		case 'DELETE_USER':
			return  {}
		default:
			return state;
	}
}

export default user;