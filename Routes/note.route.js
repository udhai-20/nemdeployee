const { Router } = require("express");
const { UserNotesModel } = require("../model/note.model");
const noteRouter = Router();
noteRouter.get("", async (req, res) => {
  try {
    const userID = req.body.userId;

    console.log("userID:", userID);
    const data = await UserNotesModel.find({ userId: userID });
    res.send(data);
  } catch (err) {
    console.log("err");
    res.status(404).send("{msg:something went wrong");
  }
});
noteRouter.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const id = req.body.userId;
    if (id) {
      const post_data = new UserNotesModel(data);
      await post_data.save();
      res.status(202).send("{msg:data added}");
    } else {
      res.send("login again");
    }
  } catch (err) {
    console.log(err);
    res.status.send("{msg:something went wrong");
  }
});
noteRouter.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.body.userId;
    const data = req.body;
    const note = await UserNotesModel.findOne({ _id: id });
    console.log(" id:", note.userId, userID);
    if (userID !== note.userId) {
      res.send("not authorised user");
    } else {
      await UserNotesModel.findByIdAndUpdate({ _id: id }, data);
      res.status(200).send("{msg: data updated successfully");
    }
  } catch (err) {
    console.log("err");
    res.send("{msg:something went wrong}");
  }
});
noteRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.body.userId;
    const note = await UserNotesModel.findOne({ _id: id });
    if (userID !== note.userId) {
      res.send("not authorised user");
    } else {
      await UserNotesModel.findByIdAndDelete({ _id: id });
      res.status(200).send("{msg: data deleted successfully");
    }
  } catch (err) {
    console.log("err");
    res.send("{msg:something went wrong}");
  }
});
module.exports = noteRouter;
