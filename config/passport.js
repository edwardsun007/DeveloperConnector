/* passport strategy */
const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys"); // secret is needed for verifying

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

// export as function which takes passport type as argument
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // jwt_payload should contain id,name,avatar
      console.log("passport checking payload got:");
      console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // console.log("backend to passport.js user=", user);
            return done(null, user);
          }
          return done(null, false); // return false if no user found
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
};
