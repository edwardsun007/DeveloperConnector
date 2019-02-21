/* post apis */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post Model
const Post = require("../../models/Post");

// Profile Model
const Profile = require("../../models/Profile");

// @route GET api/posts/test
// @desc Test posts route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/posts/test works!");
});

// @route GET api/posts/
// @desc Get all posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 }) // sort by date descending
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(404).json({ error: "No posts found" }));
});

// @route Get api/posts/:post_id
// @desc get single post
// @access public
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(404).json({ error: "No post found" }));
});

// @route POST api/posts/
// @desc create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id // current user
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route Delete api/posts/:post_id
// @desc Delete a post by id
// @access Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // find the post
    Post.findById(req.params.post_id);

    // then check if req.user.id in post.likes.user or not

    // if user liked it, then unlike it, remove this user from the likes array

    // else then add this user id to likes array as object

    Profile.findOne({ user: req.user.id }).then(profile => {
      console.log("delete post api found profile:", profile);
      Post.findById(req.params.post_id)
        .then(post => {
          // Check for post owner
          // req.user.id is string, but post.user is object what to do?
          if (post.user.toString() !== req.user.id) {
            // if this is not the person who creates this post
            return res
              .status(401)
              .json({ notauthorized: "user not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => {
          console.log("failed to find post:", err);
          res.status(404).json({ error: "post not found" });
        });
    });
  }
);

// @route POST api/posts/like/:post_id
// @desc like a post by post_id
// @access Private -- authorization needed
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            // Check if this user in likes array
            console.log("current user id=", req.user.id);
            if (
              post.likes.filter(ele => ele.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ liked: "User already liked this post" });
            }
            post.likes.push({ user: req.user.id }); // schema for likes: [ {user: id} ]
            post
              .save()
              .then(() => res.status(200).json(post))
              .catch(err => res.status(401).json(err));
            //   found = false;
            //   post.likes.map(ele => {
            //     if (ele.user.toString() === req.user.id) {
            //       console.log("current user liked it");
            //       found = true;
            //       return res
            //         .status(400)
            //         .json({ liked: "User already liked this post" });
            //     }
            //   });
            //   if (found == false) {
            //     //Add user to the likes array
            //     post.likes.push({ user: req.user.id }); // schema for likes: [ {user: id} ]
            //     post
            //       .save()
            //       .then(() => res.json(post))
            //       .catch(err => res.status(401).json(err));
            //   }
            // })
            // .catch(err => res.status(404).json({ error: "Post not found" }));
          })
          .catch(err => res.status(404).json({ error: "Profile not found" }));
      })
      .catch(err => res.status(404).json({ error: "profile not found" }));
  }
);

// @route POST api/posts/unlike/:post_id
// @desc Unlike a post by post_id
// @access Private -- authorization needed
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            // Check if this user in likes array
            console.log("current user id=", req.user.id);
            if (
              post.likes.filter(ele => ele.user.toString() === req.user.id)
                .length === 0
            ) {
              return res
                .status(400)
                .json({ liked: "You have not liked this post yet!" });
            }
            // Get remove index
            const remove = posts.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);
            // splice it out of likes array
            posts.likes.splice(remove, 1);
            post.likes.push({ user: req.user.id }); // schema for likes: [ {user: id} ]
            post
              .save()
              .then(() => res.status(200).json(post))
              .catch(err => res.status(401).json(err));
          })
          .catch(err => res.status(404).json({ error: "Profile not found" }));
      })
      .catch(err => res.status(404).json({ error: "profile not found" }));
  }
);
module.exports = router;
