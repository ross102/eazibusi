process.env.NODE_ENV !== 'production' && require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/userModel');
const Seller = require('./models/sellerModel');
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
// server.use(
// 	session({
// 		secret: 'lions are friendly',
// 		resave: false,
// 		saveUninitialized: true
// 	})
// );
//passport middleware
server.use(passport.initialize());
//passport config
require('./middleware/passportJson')(passport);
require('./middleware/facebook')(passport);
require('./middleware/google')(passport);

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
	server.get('*', function(req, res, next) {
		if (req.headers['x-forwarded-proto'] != 'https') res.redirect('https://eazibusi.herokuapp.com' + req.url);
		else next(); /* Continue to other routes if we're not redirecting */
	});
	server.use('/', express.static(path.join(__dirname, 'client/build')));
	server.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

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
		failureRedirect: '/user/login',
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
		scope: [ 'https://www.googleapis.com/auth/plus.login' ]
	})
);

server.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/login' }), function(
	req,
	res
) {
	res.redirect('/');
});

server.listen(port, (err) => {
	if (err) throw err;
	console.log('> now running on port 5000');
});

module.exports = server;
