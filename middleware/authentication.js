const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  console.log("tokenin auth:", token);
  if (token) {
    const decoded = jwt.verify(token, "hello");
    if (decoded) {
      const userId = decoded.userID;
      console.log("userId:", userId);
      req.body.userId = userId;
      next();
    } else {
      res.send("please login");
    }
  } else {
    res.send("please login");
  }
};

module.exports = { authentication };
