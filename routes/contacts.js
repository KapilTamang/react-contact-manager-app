const express = require('express');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

const { check, validationResult } = require('express-validator/check');

const router = express.Router();

//@Route GET api/contacts
//@desc Get all contacts
//@access private
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.status(200).json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@Route POST api/contacts
//@desc Create a new contact
//@access private
router.post(
	'/',
	[auth, [check('name', 'Please enter name.').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type } = req.body;

		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});

			const contact = await newContact.save();

			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//@Route PUT api/contacts
//@desc Edit a contact
//@access private
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	//Build Contact
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) {
			return res.status(400).json({ msg: 'Contact not found.' });
		}

		//Make sure the user owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized.' });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		res.status(200).json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@Route DELETE api/contacts
//@desc Delete a contact
//@access private
router.delete('/:id', auth, async (req, res) => {
	try {
		const contact = await Contact.findById(req.params.id);

		if (!contact) {
			res.status(404).json({ msg: 'Contact not found.' });
		}

		//Make sure the user owns the contact
		if (contact.user.toString() !== req.user.id) {
			res.status(401).json({ msg: 'Not authorized' });
		}

		await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Contact removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
