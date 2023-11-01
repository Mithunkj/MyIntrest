const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Jwt_swcret = process.env.Jwt_swcret;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ error: "You must have logged in 1" });
  }
  const token = authorization.replace("Bearer ", "");
  console.log(token);
  jwt.verify(token, Jwt_swcret, (err, payload) => {
    if (err) {
      return res.status(401).json(err);
    }
    const { userId } = payload;

    User.findById(userId).then((userdata) => {
      req.user = userdata;
      if (req.user === null) {
        res.status(401).json({ message: "authentication failed" });
      } else {
        console.log("login user 254154 ");
        console.log("user login athentication", req.user);
        next();
      }
    });
  });
};
