const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');

module.exports = (passport) => {
	// configure google passport
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: 'https://eazibusi.herokuapp.com/auth/google/callback'
			},
			function(accessToken, refreshToken, profile, done) {
				console.log(accessToken, profile);
				User.findOne({ 'google.username': profile.id }, function(err, user) {
					if (err) {
						return done('unauthorized');
					}
					if (!user) {
						const user = new User();
						(user.google.email = profile.emails[0].value ? profile.emails[0].value : ''),
							(user.google.username = profile.displayName),
							(user.google.accessToken = accessToken),
							(user.google.provider = 'google'),
							(user.google.googleId = profile.id),
							(user.google.avater = profile._json.picture ? profile._json.picture : '');
						user.save(function(err) {
							if (err) console.log(err);
							return done(null, user);
						});
					} else {
						//found user. Return
						return done(null, user);
					}
				});
			}
		)
	);
};
