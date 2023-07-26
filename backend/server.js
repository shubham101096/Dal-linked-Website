const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log("DB Connected Successfully!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}......`);
});
