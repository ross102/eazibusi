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
		minlength: 7
	},
	phone: {
		type: Number,
		required: true,
		trim: true,
		minlength: 11
	},
	terms: {
		type: Boolean,
		required: true,
		trim: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
