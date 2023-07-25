const express = require("express");
const mongoose = require("mongoose");
const Post = require("../model/post");

createPost = async (req, res) => {
  console.log(req.body);
  console.log("createdPost");
  const { title, pic } = req.body;
  console.log(req.body);
  if (!title || !pic) {
    return res.status(422).json({ error: "pleace add all fields" });
  }
  //req.user;
  const post = new Post({
    body: req.body.title,
    photo: req.body.pic,
    postedBy: req.user,
  });
  console.log("test 1");
  console.log(post);
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
};

allposts = async (req, res) => {
  try {
    let limit = req.query.limit;
    let skip = req.query.skip;
    console.log(limit);
    const allPost = await Post.find()
      .populate("postedBy", "_id userName Photo")
      .populate("comments.postedBy", "_id userName Photo createdAt")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");
    res.json({ title: "ALl Posts", data: allPost });
  } catch (error) {
    console.log(error);
  }
};

mypost = async (req, res) => {
  try {
    const mypost = await Post.find({ postedBy: req.user._id })
      .populate("postedBy", "_id userName")
      .populate("comments.postedBy", "_id userName")
      .sort("-createAt");

    res.json({ title: "My Post", data: mypost });
  } catch (error) {
    console.log(error);
  }
};

likepost = async (req, res) => {
  try {
    console.log(req.user);
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    )
      .populate("postedBy", "_id userName Photo")
      .populate("comments.postedBy", "_id userName Photo createdAt");
    console.log(post);
    res.json({ title: "Like", data: post });
  } catch (error) {
    console.log(error);
  }
};

unlikepost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    )
      .populate("postedBy", "_id userName Photo")
      .populate("comments.postedBy", "_id userName Photo createdAt");
    console.log(post);
    res.json({ title: "unlike", data: post });
  } catch (error) {
    console.log(error);
  }
};

commentPost = async (req, res) => {
  console.log(req.body.postId);

  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  console.log(comment);
  const commentData = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id userName Photo createdAt")
    .populate("postedBy", "_id userName");
  console.log(commentData);
  res.json({ title: "All comments", data: commentData });
};

deletePost = async (req, res) => {
  console.log(req.params.postId);
  console.log(req.user._id);
  try {
    const deleteSinglePost = await Post.findOne({
      _id: req.params.postId,
    }).populate("postedBy", "_id");

    if (!deleteSinglePost) {
      return res.status(422).json({ error: "Post not found" });
    }
    console.log(deleteSinglePost.postedBy._id);
    if (deleteSinglePost.postedBy._id.toString() === req.user._id.toString()) {
      const deletePost = await Post.findByIdAndDelete(req.params.postId);

      res.json({ title: "deleted post", data: deletePost });
    } else {
      res.status(401);
      res.send("unauthorized user");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createPost,
  allposts,
  mypost,
  likepost,
  unlikepost,
  commentPost,
  deletePost,
};
