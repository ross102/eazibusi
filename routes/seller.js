const express = require('express');
const router = express.Router();
const cors = require('cors');
const Seller = require('../models/sellerModel');
const passport = require('passport');
const { isLoggedin } = require('../middleware');

// GET register route

router.get('/success', isLoggedin, (req, res) => {
	res.send('hello world');
});

// POST register route
router.post('/seller', (req, res) => {
	if (req.body.password.length < 5) {
		return res.json({ msg: 'password should be more than five characters' });
	}
	// Check if email already exists in db
	Seller.findOne({ email: req.body.email })
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
	//check if username already exists
	Seller.findOne({ username: req.body.username })
		.then((foundUser) => {
			if (foundUser) {
				return res.status(400).json({
					msg: 'username already exists'
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
	Seller.register(new User(req.body), req.body.password, function(err, user, info) {
		if (err) {
			res.status(400).json({
				err: info.message
			});
		} else {
			passport.authenticate('local')(req, res, function() {
				res.json({
					name: user.username,
					id: user.id
				});
			});
		}
	});
});
//user login
// router.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     Seller.authenticate()(username, password)
//         .then((user) => {
//             if (user.user) {
//                 res.status(200).json({
//                     user: user.user.username,
//                     id: user.user.id
//                 });
//             } else {
//                 res.status(400).json({ user: user.error.message });
//             }
//         })
//         .catch((error) => {
//             return res.status(400).json({ error: error.message });
//         });
// });

module.exports = router;
