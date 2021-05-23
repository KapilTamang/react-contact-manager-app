import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	SET_LOADER,
	CLEAR_SUCCESS_MESSAGE,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS: {
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
				loader: false,
				successMsg: 'Registration Successful',
			};
		}
		case LOGIN_SUCCESS: {
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
				loader: false,
				successMsg: 'Login Successful',
			};
		}

		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL: {
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: null,
				user: null,
				loading: false,
				error: action.payload,
				loader: false,
			};
		}

		case CLEAR_ERRORS: {
			return {
				...state,
				error: null,
			};
		}

		case USER_LOADED: {
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		}

		case LOGOUT: {
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: null,
				loading: false,
				user: null,
				successMsg: 'Logout Successful',
			};
		}

		case SET_LOADER: {
			return {
				...state,
				loader: true,
			};
		}

		case CLEAR_SUCCESS_MESSAGE: {
			return {
				...state,
				successMsg: null,
			};
		}

		default:
			return state;
	}
};
