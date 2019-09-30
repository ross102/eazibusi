const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');

// facebook login
router.get(
	'/facebook',
	passport.authenticate('facebook', {
		authType: 'reauthenticate',
		scope: [ 'email' ]
	})
);
router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
		failureRedirect: '/user/login',
		session: false,
		scope: [ 'email' ]
	}),
	(req, res) => {
		let token = req.user.facebook.accessToken;
		// if(req.user)
		// let user = req.user.facebook.username;
		// token = encodeURIComponent(token);
		// console.log(token);
		res.redirect('/?token=' + token);
		// res.redirect('/login');
	}
);
// google routes
router.get(
	'/google',
	passport.authenticate('google', {
		scope: [ 'openid', 'email', 'profile', 'https://www.googleapis.com/auth/plus.login' ],
		prompt: 'select_account'
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/user/login',
		session: false
	}),
	function(req, res) {
		let token = req.user.google.accessToken;
		// let user = req.user.google.username;
		// token = encodeURIComponent(token);
		// console.log(token);
		res.redirect('/?token=' + token);
		// res.redirect('/login');
		// res.redirect('/');
	}
);

module.exports = router;
