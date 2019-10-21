process.env.NODE_ENV !== 'production' && require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const passport = require('passport');
const User = require('./models/userModel');
const Seller = require('./models/sellerModel');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;
const redis_port = process.env.REDIS_URL || 6379;

// routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

// redis config
let Redis_store = require('connect-redis')(session);
let client = redis.createClient(redis_port);

//check if err
client.on('error', (err) => {
	console.log('redis client error: ' + err);
});

// connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Eazibusi105', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
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

// //cookies
// server.use(cookieParser());

// express body-parser
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Configure Passport and Sessions
//Configure Sessions
server.use(
	session({
		store: new Redis_store({ client, ttl: 86400 }),
		cookie: { secure: false },
		secret: process.env.SECRETSESS,
		resave: false,
		saveUninitialized: false
	})
);
//passport middleware
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

//passport config
// require('./middleware/passportJson')(passport);
require('./middleware/facebook')(passport);
require('./middleware/google')(passport);

// server.use(passport.initialize());
// server.use(passport.session());

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

server.use(function(req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
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
	// mount route
	server.use('/', express.static(path.join(__dirname, 'client/build')));
	server.use('/user', userRoute);
	server.use('/auth', authRoute);
	server.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

// server.get('/', (req, res) => {
// 	res.send('hello');
// });

// Mount routes
server.use('/user', userRoute);
server.use('/auth', authRoute);

server.listen(port, (err) => {
	if (err) throw err;
	console.log('> now running on port 5000');
});

module.exports = server;
