process.env.NODE_ENV !== 'production' && require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/userModel');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;

// routes
const userRoute = require('./routes/user');

// connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Eazibusi105', {
	useNewUrlParser: true,
	useCreateIndex: true
});

// error messages from db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDb connection error'));

// initialize express server
const server = express();

// const whitelist = [ 'http://localhost:3000', 'http://eazibusi.herokuapp.com' ];

// //cors
// const corsOptions = {
// 	origin: function(origin, callback) {
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('Not allowed by CORS'));
// 		}
// 	}
// };
server.use(cors());
server.use('*', cors());

// express body-parser
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configure Passport and Sessions
server.use(
	session({
		secret: 'lions are friendly',
		resave: false,
		saveUninitialized: true
	})
);

server.use(passport.initialize());
server.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

server.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
	);

	//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	next();
});

if (process.env.NODE_ENV === 'production') {
	server.use(express.static('client/build'));
	server.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

// configure facebook passport
passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID,
			clientSecret: process.env.FACEBOOK_APP_SECRET,
			callbackURL: 'https://eazibusi.herokuapp.com/auth/facebook/callback',
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
			User.findOne({ 'google.googleId': profile.id }, function(err, user) {
				if (err) {
					return done(err);
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

// server.get('/', (req, res) => {
// 	res.send('hello');
// });

// Mount routes
server.use('/user', userRoute);

// facebook login
server.get(
	'/auth/facebook',
	passport.authenticate('facebook', {
		authType: 'reauthenticate',
		scope: [ 'email' ]
	})
);
server.get(
	'/auth/facebook/callback',
	cors(),
	passport.authenticate('facebook', {
		failureRedirect: '/login',
		scope: [ 'email' ]
	}),
	(req, res) => {
		res.send('auth successful');
	}
);
// google routes
server.get(
	'/auth/google',
	passport.authenticate('google', {
		authType: 'reauthenticate',
		scope: [ 'openid', 'email', 'profile' ]
	})
);

server.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
	res.redirect('/');
});

server.listen(port, (err) => {
	if (err) throw err;
	console.log('> now running on port 5000');
});

module.exports = server;
