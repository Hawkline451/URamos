
export const AUTHSTATUS = {
	LOGGED_IN: 'LOGGED_IN',
	LOGGED_OUT: 'LOGGED_OUT'
}

export const JWTSTATUS = {
	WITHOUT_JWT: 'WITHOUT_JWT',
	JWT_UPDATED: 'JWT_UPDATED',
	JWT_UNDATCHED: 'JWT_UNDATCHED',
}

export const login = (user, naturalUser) => ({
	type: 'LOGIN',
	user,
	naturalUser
	
});

export const logout = () => ({
	type: 'LOGOUT'
});

export const setJWT = jwt => ({
	type: 'SET_JWT',
	jwt
});

export const setAuthStatus = auth_status => ({
	type: 'SET_AUTH_STATUS',
	auth_status
})

export const setJWTStatus = jwt_status => ({
	type: 'SET_JWt_STATUS',
	jwt_status
})