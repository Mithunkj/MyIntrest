const express = require("express");
const router = express.Router();

const {
  getUser,
  follow,
  unfollow,
  followingpost,
  uploadProfilePic,
  followList,
} = require("../controllers/userController");
const requiredLogin = require("../middleware/requiredLogin");

router.route("/followingpost").get(requiredLogin, followingpost);
router.route("/followList").get(requiredLogin, followList);
router.route("/:id").get(requiredLogin, getUser);
router.route("/uploadProfilePic").put(requiredLogin, uploadProfilePic);

router.route("/follow").put(requiredLogin, follow);
router.route("/unfollow").put(requiredLogin, unfollow);

module.exports = router;
