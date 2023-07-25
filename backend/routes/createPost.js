const express = require("express");
const router = express.Router();

const {
  createPost,
  allposts,
  mypost,
  likepost,
  unlikepost,
  commentPost,
  deletePost,
} = require("../controllers/createPost");
const requiredLogin = require("../middleware/requiredLogin");

router.route("/createpost").post(requiredLogin, createPost);
router.route("/allposts").get(requiredLogin, allposts);
router.route("/mypost").get(requiredLogin, mypost);
router.route("/like").put(requiredLogin, likepost);
router.route("/unlike").put(requiredLogin, unlikepost);
router.route("/comment").put(requiredLogin, commentPost);
router.route("/deletePost/:postId").delete(requiredLogin, deletePost);

module.exports = router;
