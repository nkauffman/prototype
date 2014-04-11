// mongoose API
var mongoose = require('mongoose');

// Define db Schema and Model
var UserAttrs = mongoose.model('userAttrs', {
	userID: String,
	firstName: String,
	lastName: String,
	age: Number
});

module.exports.UserAttrs = UserAttrs;