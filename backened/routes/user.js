const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const passport = require('passport');

// GET register route
router.get('/success', (req, res) => {
	res.send('hello world');
});

// POST register route
router.post('/', (req, res) => {
	//check for empty fields
	if (req.body.password === '' || req.body === '' || req.body.email === '') {
		res.status(400).json({
			msg: 'some error occured',
			err
		});
	} else {
		// Check if email already exists in db
		User.findOne({ email: req.body.email })
			.then((foundUser) => {
				if (foundUser) {
					return res.status(400).json({
						msg: 'email already exists'
					});
				}
			})
			.catch((error) => {
				res.status(400).json({
					msg: 'something went wrong',
					error
				});
			});
		console.log(req.body.data);
		//get form data
		const data = {
			username: req.body.username,
			email: req.body.email,
			phone: req.body.phone,
			terms: req.body.terms
		};
		//register user
		User.register(data, req.body.password, function(err, user) {
			if (err) {
				res.status(400).json({
					err: err.message
				});
			} else {
				passport.authenticate('local')(req, res, function() {
					res.status(200).json({
						msg: 'welcome ' + user.username
					});
					return;
				});
			}
		});
	}
});

module.exports = router;
