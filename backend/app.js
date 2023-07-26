var express = require("express");
var logger = require("morgan");

const cors = require("cors");
var app = express();
require("dotenv").config();

const jobsRouter = require("./api/routes/jobs");
const announcementsRouter = require("./api/routes/announcements");
const jobSectorsRouter = require("./api/routes/jobSectors");
const successStoryRouter = require("./api/routes/successStoryRoute");
const studentRegRouter = require("./api/routes/studentReg");
const contactUsRouter = require("./api/routes/contactUs");
const adminRegRouter = require("./api/routes/adminReg");
const employerRegRouter = require("./api/routes/employerReg");
const userRoutes = require("./api/routes/userAuth");
const savedJobsRouter = require("./api/routes/savedJobs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use("/jobs", jobsRouter);
app.use("/successStory", successStoryRouter);
app.use("/contactUs", contactUsRouter);
app.use("/announcements", announcementsRouter);
app.use("/jobSectors", jobSectorsRouter);
app.use("/studentReg", studentRegRouter);
app.use("/adminReg", adminRegRouter);
app.use("/employerReg", employerRegRouter);
// app.use("/saveJob", employer);
app.use("/saveJobs", savedJobsRouter);
app.use("/user", userRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
