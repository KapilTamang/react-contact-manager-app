import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import AlertContext from '../../context/alert/AlertContext';
import Spinner from '../layout/Spinner';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;

	const {
		addContact,
		currentContact,
		clearCurrentContact,
		updateContact,
		successMsg,
		clearSuccessMsg,
		loader,
	} = contactContext;

	useEffect(() => {
		if (successMsg !== null) {
			setAlert(successMsg, 'success');
			clearSuccessMsg();
		}

		if (currentContact !== null) {
			setContact(currentContact);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
		}
		//eslint-disable-next-line
	}, [contactContext, currentContact]);

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	const { name, email, phone, type } = contact;

	const onChange = (e) =>
		setContact({ ...contact, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		if (currentContact !== null) {
			updateContact(contact);
		} else {
			addContact(contact);
		}
		clearAll();
	};

	const clearAll = () => {
		clearCurrentContact();
	};

	return (
		<form className="card" onSubmit={onSubmit}>
			<h3 className="text-primary">
				<i class="fas fa-address-book"></i>{' '}
				{currentContact ? 'Edit Contact' : 'Add Contact'}
			</h3>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={onChange}
				required
			/>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={onChange}
				required
			/>
			<input
				type="phone"
				placeholder="Phone"
				name="phone"
				value={phone}
				onChange={onChange}
				required
			/>
			<h3 className="text-left">Contact Type</h3>
			<input
				type="radio"
				name="type"
				value="personal"
				checked={type === 'personal'}
				onChange={onChange}
			/>{' '}
			Personal&nbsp; &nbsp;
			<input
				type="radio"
				name="type"
				value="professional"
				checked={type === 'professional'}
				onChange={onChange}
			/>{' '}
			Professional {loader && <Spinner />}
			<div>
				<input
					type="submit"
					value={currentContact ? 'Update Contact' : 'Add Contact'}
					className="btn btn-primary btn-block"
				/>{' '}
			</div>
			{currentContact && (
				<div>
					<button className="btn btn-danger btn-block " onClick={clearAll}>
						<i class="fas fa-times"></i> &nbsp;Cancel
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
