var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	bodyParser = require('body-parser');

var mongoose = require('mongoose');

var config = require('./config');

mongoose.connect(config.database);
mongoose.connection.on('error', function(){
	console.info(' Error: Could not connect to database . Did you forget to run `mongod` ?');
});

var app = express(),
	server = require('http').createServer(app);

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function(req, res, next){
	res.send(' Hello world ');
});

app.use(errorHandler);

server.listen(app.get('port'), function(){
	console.log(' Express server listening on port ' + app.get('port'));
});

function errorHandler(err, req, res, next){
	console.log(err);
	res.status(500).send({ message: err.message });
}
