const http = require("http");
//const https = require("https"); // for HTTPS connection
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// create express instance
const app = express();

// DB config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(err => {
    console.log("Connection failed:", err);
  });

// parse json
app.use(bodyParser.urlencoded({ extended: false })); // false to use qs library to access req.body.something
// when its true then its querystring like ? something in url string
app.use(bodyParser.json());

// APIS
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const port = process.env.PORT || 5000; // for Heroku it use process.env.PORT or we use local 5000

// Passport middleware
// https://www.npmjs.com/package/passport
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// use routes, here we tell Express to deal each api route separately
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// const server = https.createServer(
//   {
//     key: fs.readFileSync("server.key"),
//     cert: fs.readFileSync("server.cert"),
//     passphrase: "0524"
//   },
//   app
// );

// const server = http.createServer(app);
app.listen(port, () => console.log(`server now running on ${port}`));
