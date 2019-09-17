const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		minlength: 7
	},
	terms: {
		type: Boolean,
		trim: true
	},
	facebook: String,
	provider: String,
	accessToken: String,
	avater: String,
	date: {
		type: Date,
		default: Date.now
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
