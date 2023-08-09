const express = require("express");
const mongoose = require("mongoose");
const Post = require("../model/post");
const User = require("../model/userModel");

//get single user
getUser = async (req, res) => {
  console.log(req.params.id);
  try {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const userDetail = await User.findById(req.params.id)
      .select("-password")
      .populate("following", "userName Photo story")
      .populate("followers", "userName Photo ");

    const userPosts = await Post.find({ postedBy: req.params.id })
      .populate("postedBy", "_id ")
      .populate("comments.postedBy", "userName Photo createdAt")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");
    const postLength = await Post.find({ postedBy: req.params.id });

    res.json({
      user: userDetail,
      post: userPosts,
      postLength: postLength.length,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "User not found" });
  }
};

//update add follower in followerslist
follow = async (req, res) => {
  try {
    const follower = await User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    )
      .select("-password")
      .populate("following", "userName Photo ")
      .populate("followers", "userName Photo ");
    const following = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      { new: true }
    );

    console.log(follower);
    res.json({ title: "follower", data: follower });
  } catch (error) {
    console.log(error);
  }
};

//update remove follower from followeer list
unfollow = async (req, res) => {
  try {
    console.log("unfollow");
    const follower = await User.findByIdAndUpdate(
      req.body.followId,
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    )
      .select("-password")
      .populate("following", "userName Photo ")
      .populate("followers", "userName Photo ");
    const following = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.followId },
      },
      { new: true }
    );
    console.log(follower);
    res.json({ title: "unfollow", data: follower });
  } catch (error) {
    console.log(error);
  }
};

//get all follower post
followingpost = async (req, res) => {
  try {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const followingpost = await Post.find({
      postedBy: { $in: req.user.following },
    })
      .populate("postedBy", "_id userName Photo ")
      .populate("comments.postedBy", "_id userName Photo createdAt")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");

    const postLength = await Post.find({
      postedBy: { $in: req.user.following },
    });

    const following = await User.find(req.user._id)
      .populate("following", "userName Photo story")
      .select("-password");

    console.log(followingpost);
    res.json({
      title: "followingpost",
      data: followingpost,
      postLength: postLength.length,
      following: following,
    });
  } catch (error) {
    console.log(error);
    console.log("this is text");
  }
};

//upload profile pic
uploadProfilePic = async (req, res) => {
  try {
    const profilePic = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { Photo: req.body.pic },
      },
      { new: true }
    );
    res.json({ title: "Added profile pic", data: profilePic });
  } catch (error) {
    console.log(error);
  }
};

//followlist
followList = async (req, res) => {
  try {
    const follower = await User.find(req.user._id)
      .populate("following", "userName Photo ")
      .select("-password");

    console.log(follower);
    res.send(follower);
  } catch (error) {
    console.log(error);
  }
};

//search user ,username and post title
searchUser = async (req, res) => {
  try {
    const { key } = req.query;
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
  } catch (error) {
    console.log(error);
  }
};

//get all userinfo
getUsers = async (req, res) => {
  const users = await User.find().select("userName user _id Photo");
  res.json({ title: "all user", data: users });
};

//update story
createStory = async (req, res) => {
  console.log("create story");
  console.log(req.body);
  console.log(req.user._id);
  console.log(req.file);
  const basePath = `${req.protocol}://${req.get("host")}/public`;

  try {
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
  } catch (error) {
    console.log(error);
  }
};

//delete story
deleteStory = async (req, res) => {
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

  console.log(story);
  res.send(story);
};

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
