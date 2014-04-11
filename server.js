var api = require('./routes/api');
var express = require('express');
var app = express();


// Configure
app.configure(function () {
	app.use(express.static(__dirname + '/public'));	
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});



app.listen(3000);

app.get('/', function(req, res) {
	res.sendfile('./public/index.html')
});

app.get('/api/users/:userName', api.readUsers);
app.post('/api/users', api.create);
app.put('/api/users/:userName', api.updateUser);
app.delete('/api/users/:userName', api.delete);

app.get('/api/attrs/:userName', api.readAttrs);
app.put('/api/attrs/:userName', api.updateAttrs);

app.get('/api/login/:userName/:password', api.login);