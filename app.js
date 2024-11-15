const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world!@#");
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
