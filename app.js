var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pg = require('pg');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainPageRoutes = require('./routes/mainPage');
var dataRouters = require('./routes/data');
const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"hgjgj",
}));

app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(__dirname + '/public'));
//app.use(expressValidator);
app.use(logger('dev'));
app.use(express.json());
// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Set static folder
app.use(express.static(path.join(__dirname)));
// Gig routes
app.use( mainPageRoutes);
app.use('/index', indexRouter);
app.use ('/data',dataRouters);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
//app.use(function(req, res, next) {
// next(createError(404));
//});
module.exports = app;