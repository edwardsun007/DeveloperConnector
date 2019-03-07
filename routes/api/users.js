/* authentication apis only */
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar"); // get avatar from social profile of user
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys"); // configurations
const passport = require("passport"); // for protected route

// Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/users/test works!");
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists.";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(
        req.body.email,
        // options
        {
          // protocol: "https",
          s: "200", // size
          r: "pg", // rating
          d: "mm" // default value if avatar not exists
        }
      );

      // hash pw
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log("genSalt err:", err);
        } else {
          console.log("got salt:", salt);
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              console.log("bcrypt has has error:", err);
              res.status(500).json({ error: err });
            } else {
              const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: hash
              });
              newUser.save((err, user) => {
                if (err) {
                  res.status(500).json({
                    message: "Unable to register your account",
                    error: err
                  });
                } else {
                  res.json(user);
                }
              });
            }
          });
        }
      });
    }
  });
});

// @route GET api/users/login
// @desc Login user / Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      // check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // create payload
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          // sign token
          jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              console.log("err=", err);
              return res.status(500).json(err);
            } else {
              return res.status(200).json({
                success: true,
                token: "Bearer " + token
              });
            }
          });
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

// @route GET api/users/current
// @desc Return current user
// @access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("passport returned user:", req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
); //we are authenticating using jwtoken, and we not using session

module.exports = router;
