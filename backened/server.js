const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/userModel');
const session = require('express-session');
const cors = require('cors');
const port = process.env.PORT || 5000;

// connect to the database
mongoose.connect('mongodb://localhost:27017/Eazibusi102', {
	useNewUrlParser: true,
	useCreateIndex: true
});

// error messages from db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDb connection error'));

// initialize express server
const server = express();
//cors
server.use(cors());
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
	console.log(req.session);
	next();
});

server.get('/', (req, res) => {
	res.send('hello');
});

// routes
const userRoute = require('./routes/user');

// Mount routes
server.use('/user', userRoute);

server.listen(port, (err) => {
	if (err) throw err;
	console.log('> now running on port 5000');
});

module.exports = server;
