const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT;
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const post_routes = require("./routes/post_routes");
app.use("/post", post_routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
