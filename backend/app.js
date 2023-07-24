var express = require("express");
var logger = require("morgan");
var contactUsRouter = require("./api/routes/contactUs");

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

module.exports = app;
