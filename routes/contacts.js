const express = require('express');

const router = express.Router();

//@Route GET api/contacts
//@desc Get all contacts
//@access private
router.get('/', (req, res) => {
	res.send('Get all contacts');
});

//@Route POST api/contacts
//@desc Create a new contact
//@access private
router.post('/', (req, res) => {
	res.send('Create new Contact');
});

//@Route PUT api/contacts
//@desc Edit a contact
//@access private
router.put('/:id', (req, res) => {
	res.send('Edit a contact');
});

//@Route DELETE api/contacts
//@desc Delete a contact
//@access private
router.delete('/:id', (req, res) => {
	res.send('Delete a user');
});

module.exports = router;
