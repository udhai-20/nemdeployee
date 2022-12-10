const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome");
});
app.get("/name", (req, res) => {
  res.send(`name is ${process.env.NAME}`);
});

app.listen(9000, () => {
  console.log("listerning");
});
