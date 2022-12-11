const express = require("express");
const { connection } = require("./config/db");
const app = express();
require("dotenv").config();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome");
});
app.get("/about", (req, res) => {
  res.send("about");
});
app.get("/name", (req, res) => {
  res.send(process.env.NAME);
});
app.listen(8016, async () => {
  try {
    await connection;
    console.log("port running the local mongodb http://localhost:8016/");
  } catch (err) {
    console.log("connection to db is failed");
  }
});
