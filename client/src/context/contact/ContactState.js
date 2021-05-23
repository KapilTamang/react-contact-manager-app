import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CONTACTS,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	CLEAR_SUCCESS_MESSAGE,
	SET_LOADER,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		currentContact: null,
		filteredContacts: null,
		loading: true,
		error: null,
		successMsg: null,
		loader: false,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	//Get Contacts
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({
				type: GET_CONTACTS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	//Add Contact
	const addContact = async (contact) => {
		setLoader();

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);

			dispatch({
				type: ADD_CONTACT,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg,
			});
		}
	};

	//Update Contact
	const updateContact = async (contact) => {
		setLoader();

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);

			dispatch({
				type: UPDATE_CONTACT,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	//Delete Contact
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({
				type: DELETE_CONTACT,
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	//Set Current Contact
	const setCurrentContact = (contact) => {
		dispatch({
			type: SET_CURRENT,
			payload: contact,
		});
	};

	//Clear Current Contact
	const clearCurrentContact = () => {
		dispatch({
			type: CLEAR_CURRENT,
		});
	};

	//Filter Contacts
	const setFilteredContacts = (text) => {
		dispatch({
			type: FILTER_CONTACTS,
			payload: text,
		});
	};

	//Clear Filtered Contacts
	const clearFilteredContacts = () => {
		dispatch({
			type: CLEAR_FILTER,
		});
	};

	//Clear Contacts
	const clearContacts = () => {
		dispatch({
			type: CLEAR_CONTACTS,
		});
	};

	//Clear Success Message
	const clearSuccessMsg = () => {
		dispatch({
			type: CLEAR_SUCCESS_MESSAGE,
		});
	};

	//Set Loader
	const setLoader = () => {
		dispatch({
			type: SET_LOADER,
		});
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				currentContact: state.currentContact,
				filteredContacts: state.filteredContacts,
				loading: state.loading,
				error: state.error,
				successMsg: state.successMsg,
				loader: state.loader,
				getContacts,
				addContact,
				deleteContact,
				setCurrentContact,
				clearCurrentContact,
				updateContact,
				setFilteredContacts,
				clearFilteredContacts,
				clearContacts,
				clearSuccessMsg,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
