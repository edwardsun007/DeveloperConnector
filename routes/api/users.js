/* authentication apis only */
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar"); // get avatar from social profile of user
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../../models/User");

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get("/test", (req, res) => {
  res.status(200).json("/api/users/test works!");
});

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
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
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    } else {
      // check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          res.json({ msg: "Success" });
        } else {
          return res.status(400).json({ password: "Password incorrect" });
        }
      });
    }
  });
});

module.exports = router;
