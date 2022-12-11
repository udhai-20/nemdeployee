const mongoose = require("mongoose");
require("dotenv").config();
// mongoose.set("strictQuery", false);

const connection = mongoose.connect(process.env.MANGO_URL);
console.log(process.env.MANGO_URL);
module.export = { connection };
