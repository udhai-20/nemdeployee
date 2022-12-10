const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/getenv", (req, res) => {
  res.send("The name from env is " + process.env.NAME);
});

app.listen(8080, () => {
  console.log("Listening on PORT 8080");
});
