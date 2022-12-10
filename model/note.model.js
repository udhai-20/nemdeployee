const mongooese = require("mongoose");
const noteSchema = mongooese.Schema(
  {
    title: String,
    note: String,
    catagory: [],
    author: String,
    userId: String,
  },
  { versionkey: false }
);

const UserNotesModel = mongooese.model("Note", noteSchema);

module.exports = { UserNotesModel };
