
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var post = require('./routes/post');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose'),
    mongoAddress = 'mongodb://localhost/exbench';

var app = express();

// connect to db anonymously
mongoose.connect(mongoAddress);

var db = mongoose.connection;
db.on('error', function(err) {
  console.log("MongoDB connection error:", err);
});
db.once('open', function() {
  console.log("Succesfully connected to:", mongoAddress);
});

// all environments
app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('12345EDCBA'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/api/posts', post.getJSON);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
