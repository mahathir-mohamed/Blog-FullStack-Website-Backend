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
const fileupload = require('express-fileupload'); 

app.use(fileupload({
    createParentPath: true,
  }))
// app.use(function(req, res, next) {
//     var oneof = false;
//     if(req.headers.origin) {
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//         oneof = true;
//     }
//     if(req.headers['access-control-request-method']) {
//         res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
//         oneof = true;
//     }
//     if(req.headers['access-control-request-headers']) {
//         res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
//         oneof = true;
//     }
//     if(oneof) {
//         res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
//     }

//     // intercept OPTIONS method
//     if (oneof && req.method == 'OPTIONS') {
//         res.send(200);
//     }
//     else {
//         next();
//     }
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin:"*"
}));
app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/Comment',CommentRouter);

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
//   res.render('error');
});

module.exports = app;