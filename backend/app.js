var express = require("express");
var logger = require("morgan");
var contactUsRouter = require("./api/routes/contactUs");
const jobsRouter = require("./api/routes/jobs");
const successStoryRouter = require("./api/routes/successStoryRoute");
const cors = require("cors");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use("/contactUs", contactUsRouter);
app.use("/jobs", jobsRouter);
app.use("/successStory", successStoryRouter);

module.exports = app;
