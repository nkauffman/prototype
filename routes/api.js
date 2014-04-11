var User = require('../models/user').User;
var Attrs = require('../models/userAttrs').UserAttrs;

// Create
exports.create = function(req, res) {

	User.create(
		{userName: req.body.userName,
		 password: req.body.password}, function(err, user) {
			if (err) {
				res.send(err);
			}
	});

	Attrs.create({userID: req.body.userName}, function(err, user) {
		if (!err) {
			res.send('Cascaded.');
		} else if (err) {
			res.send(err);
		}
	});
}

// Read	
exports.readUsers = function(req, res) {

	User.findOne({userName: req.params.userName}, function(err, users) {
		if (!err) {
			res.send(users);
		} else if (err) {
			res.send(err);
		}				
	});
}


exports.readAttrs = function(req, res) {

	Attrs.findOne({userID: req.params.userName}, function(err, attrs) {
		if (!err) {
			res.send(attrs);
		} else if (err) {
			res.send(err);
		}
	})
}

// Update
exports.updateUser = function(req, res) {

	User.findOne({userName: req.params.userName}, function(err, user) {
	
		if (!err && user.password == req.body.old) {
			user.password = req.body.new;
			user.save();
			console.log(user);
			res.send('Password Changed');
		} else if (!err && user.password != req.body.old) {
			res.send('Invalid')
		} else if (err) {
			res.send(err);
		}

		
	})
}

exports.updateAttrs = function(req, res) {

	Attrs.findOne({userID: req.params.userName}, function(err, attrs) {
		if (!err) {
			attrs.firstName = req.body.firstName;
			attrs.lastName = req.body.lastName;
			attrs.age = req.body.age;

			attrs.save();
			res.send(attrs);
		} else if (err) {
			res.send(err);
		}
	})
}


// Delete
exports.delete = function(req, res) {

	Attrs.remove({userID: req.params.userName}, function(err) {
		if (err) {
			res.send(err);
		}
	});

	User.remove({userName: req.params.userName}, function(err) {
		if (!err) {
			res.send('User ' + req.params.userName + ' has been deleted.');
		} else if (err) {
			res.send(err);
		}	
	});
}

// Login
exports.login = function(req, res) {

	User.findOne({userName: req.params.userName}, function(err, user){
		if (user == null || user.password != req.params.password) {
			res.send('Invalid login'); 
		}
		else if (!err && user.password == req.params.password) {
			res.send('Valid login');
		} else if (err) {
			res.send(err);
		}
	});
}


