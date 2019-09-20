const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
	},
	terms: {
		type: Boolean,
		trim: true
	},
	facebook: {
		facebookId: String,
		email: String,
		username: String,
		provider: String,
		accessToken: String,
		avater: String
	},
	google: {
		googleId: String,
		username: String,
		email: String,
		provider: String,
		accessToken: String,
		avater: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);
