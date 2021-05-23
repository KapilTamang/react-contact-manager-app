import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
const Contacts = () => {
	const contactContext = useContext(ContactContext);

	const { contacts, filteredContacts, getContacts, loading } = contactContext;

	useEffect(() => {
		getContacts();
		//eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return (
			<div className="card text-center">
				<h3>
					<i class="fas fa-exclamation-circle text-primary"></i> &nbsp;No
					contacts to show!{' '}
				</h3>
				<p>Please start adding contacts.</p>
			</div>
		);
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filteredContacts !== null
						? filteredContacts.map((contact) => (
								<CSSTransition key={contact._id} timeout={500} className="item">
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition key={contact._id} timeout={500} className="item">
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
