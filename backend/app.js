require('dotenv').config();
cors = require("cors");

const mongoURL = process.env.DATABASE_URL;

const mongoose = require("mongoose");
mongoose.connect(mongoURL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("mongodb connected!");
    console.log('connected to db & listening on port', process.env.PORT)
  })
}).catch((error) => {
  console.log(error)
})

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./api/routes/index');
var contactUsRouter = require('./api/routes/contactUs');
const jobsRouter = require('./api/routes/jobs');
const announcementsRouter = require('./api/routes/announcements');
const jobSectorsRouter = require('./api/routes/jobSectors');


const adminRegRouter = require('./api/routes/adminReg');
const employerRegRouter = require('./api/routes/employerReg');
const studentRegRouter = require('./api/routes/studentReg');

const userRoutes = require('./api/routes/userAuth')


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/contactUs', contactUsRouter);
app.use('/jobs', jobsRouter);
app.use('/announcements', announcementsRouter);
app.use('/jobSectors', jobSectorsRouter);

app.use('/studentReg', studentRegRouter);
app.use('/adminReg', adminRegRouter);
app.use('/employerReg', employerRegRouter);

app.use('/user', userRoutes);


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

module.exports = app;
