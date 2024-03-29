
export const AUTHSTATUS = {
	LOGGED_IN: 'LOGGED_IN',
	LOGGED_OUT: 'LOGGED_OUT',
}

export const JWTSTATUS = {
	WITHOUT_JWT: 'WITHOUT_JWT',
	JWT_UPDATED: 'JWT_UPDATED',
	JWT_UNDATCHED: 'JWT_UNDATCHED',
}

export const setAuthStatus = auth_status => ({
	type: 'SET_AUTH_STATUS',
	auth_status
})

export const setJWTStatus = jwt_status => ({
	type: 'SET_JWT_STATUS',
	jwt_status
})

export const setUser = user => ({
	type: 'SET_USER',
	user
})

export const setNormalUser = normalUser => ({
	type: 'SET_NORMAL_USER',
	normalUser
})

export const deleteUsers = () => ({
	type: 'DELETE_USER'
})