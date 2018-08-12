
const user = (state = {}, action) => {
	switch (action.type){
		case 'LOGIN':
			return (
				{
				first_name: action.user.first_name,
				last_name: action.user.last_name,
				nickname: action.naturalUser.nickname,
				isLocked: action.naturalUser.isLocked,
				isModerator: action.naturalUser.isModerator,
				isTeacher: action.naturalUser.isTeacher,
				teacherName: action.naturalUser.teacherName
				}
			)
		case 'LOGOUT':
			return {}
		default:
			return state;
	}
}

export default user;