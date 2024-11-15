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

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/post", (res, req) => {
  res.send("get all posts");
});

app.post("/posts", (req, res) => {
  res.send("Create a post");
});

app.put("/posts/:id", (req, res) => {
  res.send("update a post");
});

app.delete("/posts/:id", (req, res) => {
  res.send("delete a post");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
