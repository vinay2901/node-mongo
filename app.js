var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig=require('swig');
var mongoose       = require('mongoose');
var dbConnection   = mongoose.connect('mongodb://localhost/ang');

var routes = require('./routes/index');
var users = require('./routes/users');
var models=require('./models/models');
var app = express();

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine','html')
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view cache', 'true');
swig.setDefaults({ cache: 'memory' });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//custom routes
app.post('/login',login);

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

function login(req,res){
  models.Member.findOne({},function(err,docs){
    if(err)
      console.log('db error');
    if(docs){
      console.log('-------',docs,'------','valid user');
      res.render('dashboard');
    }
  });
}