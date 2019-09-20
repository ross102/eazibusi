const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');

module.exports = (passport) => {
	// configure facebook passport
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: 'http://eazibusi.herokuapp.com/auth/facebook/callback',
				profileFields: [ 'id', 'email', 'displayName', 'picture.type(large)' ]
			},
			function(accessToken, refreshToken, profile, done) {
				console.log(accessToken, profile);
				User.findOne({ 'facebook.facebookId': profile.id }, function(err, user) {
					if (err) {
						return done(err);
					}
					if (!user) {
						const user = new User();
						(user.facebook.email = profile.emails[0].value ? profile.emails[0].value : ''),
							(user.facebook.username = profile.displayName),
							(user.facebook.accessToken = accessToken),
							(user.facebook.provider = 'facebook'),
							(user.facebook.facebookId = profile.id),
							(user.facebook.avater = profile.photos ? profile.photos[0].value : '');

						user.save(function(err) {
							if (err) console.log(err);
							return done(err, user);
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
