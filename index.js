const express = require("express");
const { MongoClient } = require("mongodb");
const userRouter = require("./Routes/user.route");
const notesRouter = require("./Routes/note.route");
const { authentication } = require("./middleware/authentication");
const cors = require("cors");
const url = process.env.MANGODB_URL;
const client = new MongoClient(url);
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/users", userRouter);
app.use(authentication);
app.use("/notes", notesRouter);

// app.listen(8016, async () => {
//   try {
//     await connection;
//     console.log("port running the local mongodb http://localhost:8016/");
//   } catch (err) {
//     console.log("connection to db is failed");
//   }
// });

client.connect((err) => {
  if (err) {
    console.error(err);
    return false;
  }
  // connection to mongo is successful, listen for requests
  app.listen(8016, () => {
    console.log("listening for requests");
  });
});
