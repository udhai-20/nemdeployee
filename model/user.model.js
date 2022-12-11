const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { versionkey: false }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
