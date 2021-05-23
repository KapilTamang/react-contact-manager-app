import React, { useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);

	const { deleteContact, setCurrentContact, clearCurrentContact } =
		contactContext;

	const { _id: id, name, email, phone, type } = contact;

	const onDelete = () => {
		deleteContact(id);
		clearCurrentContact();
	};

	return (
		<div className="card">
			<h3 className="text-left">
				{name}{' '}
				<span
					style={{ float: 'right' }}
					className={
						type === 'professional'
							? 'badge badge-success'
							: 'badge badge-primary'
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className="list">
				{email && (
					<li>
						<i class="fas fa-envelope text-primary"></i> {email}
					</li>
				)}

				{phone && (
					<li>
						<i class="fas fa-phone-square-alt text-primary"></i> {phone}
						<a
							href={`tel:${phone}`}
							className="btn btn-sm btn-light"
							style={{
								float: 'right',
								border: '0.5px solid rgba(0, 0, 0, 0.1)',
							}}
						>
							<strong>
								<i class="fas fa-phone-alt text-primary"></i> &nbsp; Dial
							</strong>
						</a>
					</li>
				)}
				{phone && <li></li>}
			</ul>
			<p>
				<button
					className="btn btn-primary btn-sm"
					onClick={() => setCurrentContact(contact)}
				>
					<i class="fas fa-user-edit"></i>&nbsp; Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					<i class="fas fa-user-minus"></i>&nbsp; Delete
				</button>
			</p>
		</div>
	);
};

export default ContactItem;
