/* post apis */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");

// @route GET api/posts/test
// @desc Test posts route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/posts/test works!");
});

// @route POST api/posts/test
// @desc create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id // current user
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
