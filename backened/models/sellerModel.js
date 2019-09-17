const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const sellerSchema = new Schema({
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
	shopImage: {
		type: String,
		trim: true
	},
	phone: {
		type: Number,
		trim: true
	},
	bankName: {
		type: String,
		trim: true
	},
	accountNumber: {
		type: Number,
		trim: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

sellerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Seller', sellerSchema);
