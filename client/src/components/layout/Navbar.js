import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);

	const contactContext = useContext(ContactContext);

	const { logout, isAuthenticated, user } = authContext;

	const { clearContacts } = contactContext;

	const onLogout = () => {
		logout();
		clearContacts();
	};

	const authLinks = (
		<Fragment>
			<li>
				<i class="fas fa-circle text-success"></i> {user && user.name}
			</li>
			<li>
				<a href="" onClick={onLogout} className="logout-link">
					<i class="fas fa-power-off"></i>&nbsp;
					<span>logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/about">About</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<Link to="/">
				<h1 style={{ fontSize: '1.3rem' }}>
					<i className={icon}></i>&nbsp; {title}
				</h1>
			</Link>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
	title: 'Contact Manger App',
	icon: 'fas fa-address-card',
};

export default Navbar;
