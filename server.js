// var http = require('http')
//   , https = require('https')
//   , express = require('express')
//   , app = express();

const https = require("https"); // for HTTPS connection
const fs = require("fs");

const express = require("express");
const mongoose = require("mongoose");

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

const app = express();

const port = process.env.PORT || 5000; // for Heroku it use process.env.PORT or we use local 5000

app.get("", (req, res) => {
  console.log("got res");
  res.send("Hello");
});

const server = https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
    passphrase: "0524"
  },
  app
);

server.listen(port, () => console.log(`server now running on ${port}`));
