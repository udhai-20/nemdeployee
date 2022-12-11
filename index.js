const express = require("express");
const { connection } = require("./config/db");
const userRouter = require("./Routes/user.route");
const notesRouter = require("./Routes/note.route");
const { authentication } = require("./middleware/authentication");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/users", userRouter);
app.use(authentication);
app.use("/notes", notesRouter);

app.listen(8016, async () => {
  try {
    await connection;
    console.log("port running the local mongodb http://localhost:8016/");
  } catch (err) {
    console.log("connection to db is failed");
  }
});
