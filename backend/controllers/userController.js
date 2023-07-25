const express = require("express");
const mongoose = require("mongoose");
const Post = require("../model/post");
const User = require("../model/userModel");

getUser = async (req, res) => {
  console.log(req.params.id);
  try {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const userDetail = await User.findOne({ _id: req.params.id })
      .select("-password")
      .populate("following", "userName Photo ")
      .populate("followers", "userName Photo ");

    const userPosts = await Post.find({ postedBy: req.params.id })
      .populate("postedBy", "_id ")
      .populate("comments.postedBy", "userName Photo Photo createdAt")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");
    const postLength = await Post.find({ postedBy: req.params.id });

    //console.log(userPosts);
    res.json({
      user: userDetail,
      post: userPosts,
      postLength: postLength.length,
    });
  } catch (error) {
    console.log(error);
  }
};

//get follow user
follow = async (req, res) => {
  try {
    const follower = await User.findByIdAndUpdate(
      req.body.followId,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    );
    const following = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      { new: true }
    );

    console.log(follower);
    res.send(follower);
  } catch (error) {
    console.log(error);
  }
};

//get unfollow user
unfollow = async (req, res) => {
  try {
    console.log("unfollow");
    const follower = await User.findByIdAndUpdate(
      req.body.followId,
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    );
    const following = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.followId },
      },
      { new: true }
    );
    console.log(follower);
    res.send(follower);
  } catch (error) {
    console.log(error);
  }
};

//to show following
followingpost = async (req, res) => {
  try {
    let limit = req.query.limit;
    let skip = req.query.skip;
    const followingpost = await Post.find({
      postedBy: { $in: req.user.following },
    })
      .populate("postedBy", "_id userName Photo")
      .populate("comments.postedBy", "_id userName Photo createdAt")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");

    const postLength = await Post.find({
      postedBy: { $in: req.user.following },
    });

    const following = await User.find(req.user._id)
      .populate("following", "userName Photo ")
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

//to upload profile pic
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

module.exports = {
  getUser,
  follow,
  unfollow,
  followingpost,
  uploadProfilePic,
  followList,
};
