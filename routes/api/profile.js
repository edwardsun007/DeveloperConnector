/* profile apis only */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

/* Load models */
const Profile = require("../../models/Profile");

/* Load User profile */
const User = require("../../models/User");

/* Load validator */
const validateProfileInput = require("../../validation/profile");

// @route GET api/profile/test
// @desc Test profile route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/profile/test works!");
});

// @route GET api/profile/all
// @desc Test profile route
// @access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profiles = "There are no profiles!";
        return res.status(404).json(errors);
      }
      res.status(200).json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/
// @desc GET current user's profile
// @access Private--protected route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    // passport middleware returns user object to the req
    console.log("profile/ check req.user", req.user);
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]) // we want to pull avatar and name off the user object we found
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

// @route GET api/profile/handle/:handle
// @desc GET profile by handle
// @access Public route
router.get("/handle/:handle", (req, res) => {
  console.log(req.params.handle);
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc GET profile by id
// @access Protected Internal route
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route POST api/profile/
// @desc CREATE new profile or EDIT profile for registered user
// @access Private -- protected route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validate profileinput
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    /* pull property from req.body into local profileFields variable */
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubname) profileFields.githubname = req.body.githubname;
    // SKILLS Split into array
    if (typeof req.body.skill !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }

    // pull Social media urls from reb.body
    profileFields.social = {}; // initialize empty field
    if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // determine if its update or create
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update
        console.log("start update logic");
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => {
            console.log("updated profile.");
            res.json(profile);
          })
          .catch(err => res.json(err));
      } else {
        // CREATE
        console.log("start create logic");
        // CHECK if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
module.exports = router;
