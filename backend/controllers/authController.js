const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Post = require("../model/post");
const app = express();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const refresh = process.env.Jwt_swcret;

register = async (req, res) => {
  try {
    if (
      !req.body.userName ||
      !req.body.email ||
      !req.body.mobileNumber ||
      !req.body.password
    ) {
      return res.status(400).send({ error: "fill all fields" });
    }

    const existUser = await User.find({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });
    console.log(existUser);

    if (existUser.length > 0) {
      return res.status(400).json({ error: "user already present" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 12);
    console.log("test 2");
    // console.log(req.body);
    const newUser = await User.create({
      userName: req.body.userName,
      password: hashPassword,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      address: req.body.address,
    });
    //console.log(newUser);
    res.status(201).json({
      title: "new user has been created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

login = async (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(404).send({ error: "user not found" });
  }
  console.log("test 2");

  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ userId: user._id }, refresh);
    const { _id, userName, email } = user;
    res.json({
      user: { _id, userName, email },
      // userId: user._id,
      token: token,
    });
  } else {
    res.status(404).send({ error: "user not found" });
  }
};

module.exports = {
  register,
  login,
};
