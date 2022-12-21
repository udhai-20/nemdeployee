const mongoose = require("express");
const bcrypt = require("bcrypt");
const userRTouter = mongoose.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
userRTouter.get("", (req, res) => {
  res.send("hello");
});
userRTouter.post("/signup", async (req, res) => {
  try {
    let { email, password } = req.body;
    let find_email = await UserModel.find({ email });
    console.log(" find_email:", find_email[0]);
    if (find_email.length == 0) {
      bcrypt.hash(password, 6, async function (err, hash) {
        // Store hash in your password DB.
        const signup_data = new UserModel({ email, password: hash });
        await signup_data.save();
        const get_data = await UserModel.find();
        res.status(200).send({ req: "success" });
      });
    } else {
      res.send("email Already Exists");
    }
  } catch (err) {
    console.log("err", "connection to db is failed");
    res.status(404).send("something went wrong");
  }
});

userRTouter.post("/login", async (req, res) => {
  // try {
  //   let find_match = await UserModel.find({ email });
  //   console.log("  find_match:", find_match.length);
  //   if (find_match.length > 0) {
  //     const hased_pass = find_match[0].password;
  //     // console.log("  find_match[0]._i:", find_match[0]._id);
  //     bcrypt.compare(password, hased_pass, function (err, result) {
  //       if (result) {
  //         const token = jwt.sign({ userID: find_match[0]._id }, "hello");
  //         res.send({ res: "Loggeding successfull", token: token });
  //       } else {
  //         res.status(401).send("loggeding failure");
  //       }
  //       // result == true
  //     });
  //   } else {
  //     res.status(401).send("loggeding failure");
  //   }
  // } catch (err) {
  //   console.log("err");
  // }
  //   const { email, password } = req.body;
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    let userdata = user[0].fname;
    console.log("userdata:", userdata);
    if (user) {
      const hashed_password = user[0].password;
      // console.log("hashed_password:", hashed_password, password);
      bcrypt.compare(password, hashed_password, function (err, result) {
        console.log("result:", result);
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "hello");
          console.log("token:", token);
          res.send({ msg: "successfull", token: token, fname: userdata });
        } else {
          res.status(404).send({ msg: "failure", token: null, user: null });
        }
      });
    } else {
      res.send("Login failed");
    }
  } catch {
    res.send("Something went wrong, please try again later");
  }
});

userRTouter.get("/products", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("token:", token);
  const decoded = jwt.verify(token, "hello", function (err, decoded) {
    if (err) {
      res.send("Login Again");
    } else if (decoded) {
      res.send("welcome");
    }
  });
});

userRTouter.get("/Posts", (req, res) => {
  const token = req.headers.authorization;
  console.log("token:", token);
  const decoded = jwt.verify(token, "hello", function (err, decoded) {
    if (err) {
      res.send("Login Again");
    } else if (decoded) {
      res.send("welcome");
    }
  });
});
module.exports = userRTouter;
