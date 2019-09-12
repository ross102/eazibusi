const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/userModel');
const passport = require('passport');
const { isLoggedin } = require('../middleware');

// GET register route

router.get('/success', isLoggedin, (req, res) => {
	res.send('hello world');
});

// POST register route
router.post('/', (req, res) => {
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
	//get form data

	//register user
	User.register(new User(req.body), req.body.password, function(err, user) {
		if (err) {
			res.status(400).json({
				err: err.message
			});
		} else {
			passport.authenticate('local')(req, res, function() {
				res.json({ name: user.username });
			});
		}
	});
});

module.exports = router;
