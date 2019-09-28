const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isLoggedin } = require('../middleware');

// GET register route

router.get('/success', isLoggedin, (req, res) => {
	res.send('hello world');
	console.log('user :' + req.user);
});

// POST register route
router.post('/register', (req, res) => {
	if (req.body.password.length < 5) {
		return res.json({ msg: 'invalid format' });
	}
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
			return res.status(400).json({
				msg: 'something went wrong',
				error
			});
		});
	//check if username already exists
	User.findOne({ username: req.body.username })
		.then((foundUser) => {
			if (foundUser) {
				return res.status(400).json({
					msg: 'username already exists'
				});
			}
		})
		.catch((error) => {
			return res.status(400).json({
				msg: 'something went wrong',
				error
			});
		});
	//register user
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		terms: req.body.terms
	});
	// hash password
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) console.log(err);
			newUser.password = hash;
			newUser
				.save()
				.then((user) => {
					res.json(user);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	});
});
//user login
router.post('/login', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ err: 'please input correct details' });
	}
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				return res.status(400).json({ err: 'email not found' });
			}
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (isMatch) {
					// create Jwt payload
					const payload = {
						id: user.id,
						username: user.username
					};
					// sign token
					jwt.sign(
						payload,
						process.env.SECRETORKEY,
						{
							expiresIn: 31556926
						},
						(err, token) => {
							// console.log(token);
							// token = encodeURIComponent(token);
							// res.redirect('https://eazibusi.herokuapp.com?token=' + token + '&user= ' + user.username);
							return res.json({
								success: true,
								token: {
									token: 'Bearer ' + token,
									user: user
								}
							});
							// user.accessToken = token;
							// user.save((err) => {
							// 	if (err) throw err;
							// });
							// res.redirect('/');
						}
					);
				} else {
					return res.status(400).json({ err: 'password incorrect' });
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/verify', (req, res) => {
	if (req.user) {
		return res.status(200).json(req.user);
	}
	return res.status(400).json('no such user');
});

module.exports = router;
