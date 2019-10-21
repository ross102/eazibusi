const User = require('../models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {
	isLoggedin: (req, res, next) => {
		let token = req.headers['x-access-token'] || [ 'x-access-authorization' ];
		token = token.split(' '); //bearer token
		token = token[1];
		//check if user logged in from social media
		if (req.session.token) return next();
		//verify user that logged in locally
		if (!token) {
			return res.status(400).json({
				success: 'false',
				msg: ' Access Denied. No token given. '
			});
		}
		jwt.verify(token, process.env.SECRETORKEY, (err, verified) => {
			if (err) throw new Error(err);
			return next();
		});
	}
};
