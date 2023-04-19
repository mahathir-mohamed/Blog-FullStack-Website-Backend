var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var confiq=require('./confiq/config');
var cors = require('cors');

var indexRouter = require('./routes/index');
// var AuthRouter = require('./routes/users');
var authRouter = require('./routes/users');
var CommentRouter = require('./routes/Comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: '*'
}));
// const fileUpload = require('express-fileupload');
// app.use(fileUpload()); 

app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/Comment',CommentRouter);
// app.use('/Auth', AuthRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : err;

  // render the error page
  res.status(err.status || 500);
//   res.render('error');
});

module.exports = app;
