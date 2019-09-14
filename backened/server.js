const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/userModel');
const session = require('express-session');
const cors = require('cors');
const path = require('part');
const port = process.env.PORT || 5000;

// routes
const userRoute = require('./routes/user');

// connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Eazibusi102', {
	useNewUrlParser: true,
	useCreateIndex: true
});

// error messages from db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDb connection error'));

// initialize express server
const server = express();

//cors
// const corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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
	console.log(req.session);
	next();
});

server.get('/', (req, res) => {
	res.send('hello');
});

// Mount routes
server.use('/user', userRoute);

if (process.env.NODE_ENV === 'production') {
	server.use(express.static('client/build'));
	server.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

server.listen(port, (err) => {
	if (err) throw err;
	console.log('> now running on port 5000');
});

module.exports = server;
