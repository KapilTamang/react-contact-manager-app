import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';
import Spinner from '../layout/Spinner';

const Login = (props) => {
	const authContext = useContext(AuthContext);

	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;

	const {
		login,
		error,
		clearErrors,
		isAuthenticated,
		loader,
		successMsg,
		clearSuccessMessage,
	} = authContext;

	useEffect(() => {
		if (successMsg !== null) {
			setAlert(successMsg, 'success');
			clearSuccessMessage();
		}

		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger');
			clearErrors();
		}

		//eslint-disable-next-line
	}, [error, isAuthenticated, props]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else {
			login({
				email,
				password,
			});
		}
	};

	return (
		<div className="form-container">
			<form onSubmit={onSubmit} className="card">
				<h3>
					Account <span className="text-primary">&nbsp;Login</span>
				</h3>
				<div
					style={{ height: '2px', background: '#f4f4f4', marginTop: '5px' }}
				/>
				<div className="form-group">
					<label htmlFor="email">
						<i class="fas fa-envelope text-primary"></i>&nbsp; Email
					</label>
					<input
						type="email"
						value={email}
						name="email"
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">
						<i class="fas fa-lock text-primary"></i>&nbsp; Password
					</label>
					<input
						type="password"
						value={password}
						name="password"
						onChange={onChange}
						required
						minLength="6"
					/>
				</div>
				{loader && <Spinner />}
				<div>
					<input
						type="submit"
						value="Login"
						className="btn btn-primary btn-block"
					/>
				</div>
			</form>
		</div>
	);
};

export default Login;
