const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	email:{
		type: String,
		required: [true, "Email of user is neccessary"]
	},
	username:{
		type: String,
		required: [true, "Username of user is neccessary"]
	},
	password:{
		type: String,
		required: [true, "password of user is neccessary"]
	},
	isAdmin:{
		type: Boolean,
		default:false
	}
});

module.exports = mongoose.model('User', userSchema);