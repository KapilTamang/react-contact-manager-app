import React, { useReducer } from 'react';
import axios from 'axios';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	AUTH_ERROR,
	USER_LOADED,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	SET_LOADER,
	CLEAR_SUCCESS_MESSAGE,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true,
		error: null,
		loader: false,
		successMsg: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	//Load User
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	//Register User
	const register = async (formData) => {
		setLoader();

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', formData, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	//Login User
	const login = async (formData) => {
		setLoader();

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/auth', formData, config);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	//Logout User
	const logout = () => {
		dispatch({
			type: LOGOUT,
		});
	};

	//Clear Errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	//Set Loader
	const setLoader = () => {
		dispatch({
			type: SET_LOADER,
		});
	};

	//clearSuccessMessage
	const clearSuccessMessage = () => {
		dispatch({
			type: CLEAR_SUCCESS_MESSAGE,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loading: state.loading,
				error: state.error,
				loader: state.loader,
				successMsg: state.successMsg,
				register,
				loadUser,
				login,
				logout,
				clearErrors,
				clearSuccessMessage,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
