/* profile apis only */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

/* Load models */
const Profile = require("../../models/Profile");

/* Load User profile */
const User = require("../../models/User");

// @route GET api/profile/test
// @desc Test profile route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/profile/test works!");
});

// @route GET api/profile/
// @desc Get current user's profile
// @access Private--protected route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    // passport middleware returns user object to the req
    console.log("profile/ check req.user", req.user);
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user!";
          return res.status(404).json(errors);
        }
        res.status(200).json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile/
// @desc Create new profile for registered user
// @access Private -- protected route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
  }
);
module.exports = router;
