import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import Spinner from '../layout/Spinner';

const Register = (props) => {
	const alertContext = useContext(AlertContext);

	const authContext = useContext(AuthContext);

	const {
		register,
		error,
		clearErrors,
		isAuthenticated,
		loader,
		successMsg,
		clearSuccessMessage,
	} = authContext;

	const { setAlert } = alertContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}

		if (successMsg !== null) {
			setAlert(successMsg, 'success');
			clearSuccessMessage();
		}
		//eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { name, email, password, confirmPassword } = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== confirmPassword) {
			setAlert('Passwords donot match', 'danger');
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div className="form-container">
			<form onSubmit={onSubmit} className="card">
				<h3>
					Account &nbsp;<span className="text-primary">Registration</span>
				</h3>
				<div
					style={{ height: '2px', background: '#f4f4f4', marginTop: '5px' }}
				/>
				<div className="form-group">
					<label htmlFor="name">
						<i class="fas fa-user-tie text-primary"></i>&nbsp; Name
					</label>
					<input
						type="text"
						value={name}
						name="name"
						onChange={onChange}
						required
					/>
				</div>
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
				<div className="form-group">
					<label htmlFor="confirmPassword">
						<i class="fas fa-lock text-primary"></i>&nbsp; Confirm Password
					</label>
					<input
						type="password"
						value={confirmPassword}
						name="confirmPassword"
						onChange={onChange}
						required
						minLength="6"
					/>
				</div>
				{loader && <Spinner />}
				<div>
					<input
						type="submit"
						value="Register"
						className="btn btn-primary btn-block"
					/>
				</div>
			</form>
		</div>
	);
};

export default Register;
