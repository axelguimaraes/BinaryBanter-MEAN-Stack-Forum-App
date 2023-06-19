var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

// ROUTES
var indexRouter = require('./routes/index.routes')
var authRouter = require('./routes/auth.routes')
var postRouter = require('./routes/post.routes')
var threadRouter = require('./routes/thread.routes')
var userRouter = require('./routes/user.routes')
var indexRouter = require('./routes/index.routes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.static('public'));

// ROUTES
app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/thread', threadRouter)
app.use('/api/user', userRouter)
app.use('/api', indexRouter)


// Logo
app.get('/api/logo', (req, res) => {
  const logoImageUrl = '/images/BinaryBanter.png'
  res.json({logoImageUrl})
})

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
  res.render('error');
});

// Database connection
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:tr3XLIkpeYUyv1Vt@cluster0.qrcemhx.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Database connected!'))
.catch(err => console.error('Error connecting to database:', err));


module.exports = app;
