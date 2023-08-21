const express = require("express");
const mongoose = require("mongoose");
const Post = require("../model/post");
const User = require("../model/userModel");
const expressAsyncHandler = require("express-async-handler");

//get single user
getUser = expressAsyncHandler(async (req, res) => {
  console.log(req.params.id);
  let limit = req.query.limit;
  let skip = req.query.skip;
  const userDetail = await User.findById(req.params.id)
    .select("-password")
    .populate("following", "userName Photo user story")
    .populate("followers", "userName Photo user");

  const userPosts = await Post.find({ postedBy: req.params.id })
    .populate("postedBy", "_id ")
    .populate("comments.postedBy", "userName Photo user createdAt")
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .sort("-createdAt");
  const postLength = await Post.find({ postedBy: req.params.id });

  res.json({
    user: userDetail,
    post: userPosts,
    postLength: postLength.length,
  });
});

//update add follower in followerslist
follow = expressAsyncHandler(async (req, res) => {
  const follower = await User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  )
    .select("-password")
    .populate("following", "userName Photo user")
    .populate("followers", "userName Photo user");
  const following = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { following: req.body.followId },
    },
    { new: true }
  );

  console.log(follower);
  res.json({ title: "follower", data: follower });
});

//update remove follower from followeer list
unfollow = expressAsyncHandler(async (req, res) => {
  console.log("unfollow");
  const follower = await User.findByIdAndUpdate(
    req.body.followId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  )
    .select("-password")
    .populate("following", "userName Photo user")
    .populate("followers", "userName Photo user");
  const following = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { following: req.body.followId },
    },
    { new: true }
  );
  console.log(follower);
  res.json({ title: "unfollow", data: follower });
});

//get all follower post
followingpost = expressAsyncHandler(async (req, res) => {
  let limit = req.query.limit;
  let skip = req.query.skip;
  const followingpost = await Post.find({
    postedBy: { $in: req.user.following },
  })
    .populate("postedBy", "_id userName Photo user")
    .populate("comments.postedBy", "_id userName Photo user createdAt")
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .sort("-createdAt");

  const postLength = await Post.find({
    postedBy: { $in: req.user.following },
  });

  const following = await User.find(req.user._id)
    .populate("following", "userName Photo user story")
    .select("-password");

  console.log(followingpost);
  res.json({
    title: "followingpost",
    data: followingpost,
    postLength: postLength.length,
    following: following,
  });
});

//upload profile pic
uploadProfilePic = expressAsyncHandler(async (req, res) => {
  console.log(req.body.pic);
  if (!req.body.pic) {
    res.status(442);
    throw new Error("Please add ProfilePhoto");
  }
  const profilePic = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { Photo: req.body.pic },
    },
    { new: true }
  );
  res.json({ title: "Added profile pic", data: profilePic });
});

//followlist
followList = expressAsyncHandler(async (req, res) => {
  const follower = await User.find(req.user._id)
    .populate("following", "userName Photo user")
    .select("-password");

  console.log(follower);
  res.send(follower);
});

//search user ,username and post title
searchUser = expressAsyncHandler(async (req, res) => {
  const { key } = req.query;
  console.log(key);
  if (!key) {
    res.status(442);
    throw new Error("Please add search key");
  }
  const result = await User.find({
    $or: [
      { user: { $regex: key, $options: "i" } },
      {
        userName: { $regex: key, $options: "i" },
      },
    ],
  });
  const post = await Post.find({ body: { $regex: key, $options: "i" } });
  // .limit(15)
  // .skip(15);

  res.json({ title: "Search Result", user: result, post: post });
});

//get all userinfo
getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find().select("userName user _id Photo");
  res.json({ title: "all user", data: users });
});

//update story
createStory = expressAsyncHandler(async (req, res) => {
  console.log("create story");
  console.log(req.body);
  console.log(req.user._id);
  console.log(req.file);
  const basePath = `${req.protocol}://${req.get("host")}/public`;
  const story = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        story: {
          $each: [
            {
              title: req.body.title,
              image: `${basePath}/${req.file.filename}`,
            },
          ],
        },
      },
    },
    { new: true }
  );

  console.log(story);
  res.json({ title: "story is create", data: story });
});

//delete story
deleteStory = expressAsyncHandler(async (req, res) => {
  console.log("delete story");
  console.log(req.body.storyId);
  console.log(req.user._id);
  const story = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { story: { _id: req.body.storyId } },
    },
    { new: true }
  );

  console.log("story", story);
  res.send(story);
});

module.exports = {
  getUser,
  follow,
  unfollow,
  followingpost,
  uploadProfilePic,
  followList,
  searchUser,
  getUsers,
  createStory,
  deleteStory,
};
