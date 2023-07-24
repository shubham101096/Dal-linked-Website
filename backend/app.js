var express = require("express");
var logger = require("morgan");

const cors = require("cors");
var app = express();
var express = require("express");
var logger = require("morgan");
require("dotenv").config();

var contactUsRouter = require("./api/routes/contactUs");
const jobsRouter = require("./api/routes/jobs");
const announcementsRouter = require("./api/routes/announcements");
const jobSectorsRouter = require("./api/routes/jobSectors");
const successStoryRouter = require("./api/routes/successStoryRoute");
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use("/contactUs", contactUsRouter);
app.use("/jobs", jobsRouter);
app.use("/successStory", successStoryRouter);
app.use("/contactUs", contactUsRouter);
app.use("/announcements", announcementsRouter);
app.use("/jobSectors", jobSectorsRouter);
app.use("/studentReg", studentRegRouter);
app.use("/adminReg", adminRegRouter);
app.use("/employerReg", employerRegRouter);

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
