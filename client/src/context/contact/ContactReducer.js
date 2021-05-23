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

export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS: {
			return {
				...state,
				contacts: action.payload,
				loading: false,
			};
		}
		case ADD_CONTACT: {
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
				loading: false,
				successMsg: 'Contact has been added successfully.',
				loader: false,
			};
		}

		case UPDATE_CONTACT: {
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact._id === action.payload._id ? action.payload : contact
				),
				loading: false,
				successMsg: 'Contact has been updated successfully.',
				loader: false,
			};
		}

		case DELETE_CONTACT: {
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact._id !== action.payload
				),
				loading: false,
				successMsg: 'Contact has been deleted successfully.',
				loader: false,
			};
		}

		case SET_CURRENT: {
			return {
				...state,
				currentContact: action.payload,
			};
		}

		case CLEAR_CURRENT: {
			return {
				...state,
				currentContact: null,
			};
		}

		case FILTER_CONTACTS: {
			return {
				...state,
				filteredContacts: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex) || contact.email.match('regex');
				}),
			};
		}

		case CLEAR_FILTER: {
			return {
				...state,
				filteredContacts: null,
			};
		}

		case CONTACT_ERROR: {
			return {
				...state,
				error: action.payload,
			};
		}

		case CLEAR_CONTACTS: {
			return {
				...state,
				contacts: null,
			};
		}

		case CLEAR_SUCCESS_MESSAGE: {
			return {
				...state,
				successMsg: null,
			};
		}

		case SET_LOADER: {
			return {
				...state,
				loader: true,
			};
		}

		default:
			return state;
	}
};
