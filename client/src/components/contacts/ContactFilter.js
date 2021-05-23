import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);

	const text = useRef('');

	const { filteredContacts, setFilteredContacts, clearFilteredContacts } =
		contactContext;

	useEffect(() => {
		if (filteredContacts === null) {
			text.current.value = '';
		}
	});

	const onChange = (e) => {
		if (text.current.value !== '') {
			setFilteredContacts(e.target.value);
		} else {
			clearFilteredContacts();
		}
	};
	return (
		<form>
			<input
				ref={text}
				type="text"
				placeholder="Filter Contacts..."
				onChange={onChange}
			/>
		</form>
	);
};

export default ContactFilter;
