var dotenv = require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var patientsRouter = require('./routes/patients');
var hospitalBedsRouter = require('./routes/hospital-beds');
var teamRouter = require('./routes/team');
var requestsRouter = require('./routes/requests');
var models = require('./models/index');
var expressLayouts = require('express-ejs-layouts');


var app = express();

app.locals.title = 'Hospital Management System';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/patients', patientsRouter);
app.use('/hospital-beds', hospitalBedsRouter);
app.use('/team', teamRouter);
app.use('/requests', requestsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
